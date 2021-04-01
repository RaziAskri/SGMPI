import { Component, OnInit } from '@angular/core';
import { InterventionService } from 'app/Core/intervention/intervention.service';
import { PanneService } from 'app/Core/panne/panne.service';
import { Intervention } from 'app/Core/intervention/intervention.model';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { AddeditInterventionComponent } from '../addedit-intervention/addedit-intervention.component';
import { DatePipe } from '@angular/common';
import { Panne } from 'app/Core/panne/panne.model';
import * as moment from 'moment';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';




@Component({
  selector: 'app-list-intervention',
  templateUrl: './list-intervention.component.html',
  styleUrls: ['./list-intervention.component.css'],
  providers: [DatePipe]
})
export class ListInterventionComponent implements OnInit {
  user: User;

  constructor( 
    public interventionservice: InterventionService,
    public panneService: PanneService,
    private dialog:MatDialog,
    private _snack:MatSnackBar,
    private authenticationService: AuthenticationService,
    ) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);

    }
    intervention:Intervention;
    panne: Panne;
    interventionsachevee: Intervention[];
    interventionsnonachevee: Intervention[]
    n:number;
  ngOnInit(): void {
    this.getInterventionsAchevee();
    this.getInterventionsNonAchevee();
  }

  getInterventionsAchevee(){
    this.interventionservice.getInterventionAchevee().subscribe(
      data=>{
        this.interventionsachevee=data as Intervention[];
     
      },error=>{
        console.log(error)
      }
    )
    
  }
  getInterventionsNonAchevee(){
    this.interventionservice.getInterventionNonAchevee().subscribe(
      data=>{
        this.interventionsnonachevee=data as Intervention[];
     
      },error=>{
        console.log(error)
      }
    )
    
  }
  openComponentForPost(id_panne){
    this.interventionservice.initializeFormForPost(id_panne);
    this.dialog.open(AddeditInterventionComponent).afterClosed().subscribe(res => {
      this.getInterventionsAchevee();
  
   });
  }

  openComponentForUpdate(Intervention: Intervention) {
    this.interventionservice.initializeFormForEdit(Intervention);
    this.dialog.open(AddeditInterventionComponent).afterClosed().subscribe(res => {
      this.getInterventionsAchevee();
  
   });
  
   }
  
  
  
   onDelete(id_intervention){
    if (confirm("Vous êtes sûr de vouloir supprimer cette intervention")) {
      this.interventionservice.deleteIntervention(id_intervention).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getInterventionsAchevee();
      },error=>{
        console.log(error);
      });
    }
    this.getInterventionsAchevee();
  }
  

  ValiderIntervention(intervention){
    if (confirm("Vous êtes sûr de vouloir valider cette intervention ?")) {
     
    intervention.dateFin=moment().format('DD/MM/yyyy');
      intervention.etatIntervention="Achevée";
      this.interventionservice.initializeFormForEdit(intervention);

      this.interventionservice.putIntervention().subscribe(data=>{
      this._snack.open("intervention validée",'x',{
      verticalPosition: 'top',
      duration: 2000,
      panelClass: 'snack-'
    });
    this.getInterventionsAchevee();
    this.getInterventionsNonAchevee();
  }, error=>{
    console.log(error);
  });

  this.panneService.getPanneById(intervention.id_panne).subscribe(data=>
    {
      this.panne=data as Panne;
      this.panne.etat_panne="réparée";
      console.log("+++++"+this.panne.etat_panne);
      this.panneService.initializeFormForEdit(this.panne);
      this.panneService.putPanne().subscribe(data=>{
        this._snack.open("panne réparée",'x',{
        verticalPosition: 'top',
        duration: 2000,
        panelClass: 'snack-'
      });
    });
 
  
  this.panneService.getPanne();
}, error=>{
  console.log(error);
});
}

this.getInterventionsAchevee();
  }


echecIntervention(intervention) {

  if (confirm("Vous êtes sûr de vouloir déclarer l'échec de cette intervention et la création d'une nouvelle intervention ?")) {
     
        intervention.dateFin=moment().format('DD/MM/yyyy');
        console.log( intervention.dateFin);
        intervention.etatIntervention="Achevée sans succés";

    this.interventionservice.initializeFormForPost(intervention.id_panne);
    this.dialog.open(AddeditInterventionComponent).afterClosed().subscribe(res => {
      this.getInterventionsAchevee();


  
   });
  
   }
  }


prolongerIntervention(intervention){
  if (confirm("Vous êtes sûr de vouloir prolonger la durée de cette intervention par 1 jour ?")) {
   
    intervention.duree = +intervention.duree+1;
    this.interventionservice.initializeFormForEdit(intervention);

    this.interventionservice.putIntervention().subscribe(data=>{
    this._snack.open("Durée de l'intervention est prolongée par 1 jour",'x',{
    verticalPosition: 'top',
    duration: 2000,
    panelClass: 'snack-'
  });
  this.getInterventionsNonAchevee();
}, error=>{
  console.log(error);
});

}
}
get isAdmin() {
  return this.user && this.user.role === Role.Admin;
}
get isUser() {
return this.user && this.user.role === Role.User;
}

}




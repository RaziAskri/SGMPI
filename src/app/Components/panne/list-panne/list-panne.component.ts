import { Component, OnInit } from '@angular/core';
import { PanneService } from 'app/Core/panne/panne.service';
import { Panne } from 'app/Core/panne/panne.model';
import { AddeditPanneComponent } from '../addedit-panne/addedit-panne.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Machine } from 'app/Core/machine/machine.model';
import { MachineService } from 'app/Core/machine/machine.service';
import { Intervention } from 'app/Core/intervention/intervention.model';
import { InterventionService } from 'app/Core/intervention/intervention.service';
import { AddeditInterventionComponent } from 'app/Components/intervention/addedit-intervention/addedit-intervention.component';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';






@Component({
  selector: 'app-list-panne',
  templateUrl: './list-panne.component.html',
  styleUrls: ['./list-panne.component.css']
})
export class ListPanneComponent implements OnInit {
  user: User;

  constructor( 
    public panneService:PanneService,
    public interventionService:InterventionService,
    private dialog:MatDialog,
    private _snack:MatSnackBar,
    private authenticationService: AuthenticationService,
    ) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);

     }
    pannes:Panne[]


  ngOnInit(): void {
    
    this.getPannes();

  }

  getPannes(){
    console.log("here")
    this.panneService.getPanneDTO().subscribe(
      data=>{
        this.pannes=data as Panne[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  openComponentForPost(id_machine){
    this.panneService.initializeFormForPost(id_machine);
    this.dialog.open(AddeditPanneComponent).afterClosed().subscribe(res => {
      this.getPannes();
  
   });
  }

  openComponentForUpdate(Panne: Panne) {
    this.panneService.initializeFormForEdit(Panne);
    this.dialog.open(AddeditPanneComponent).afterClosed().subscribe(res => {
      this.getPannes();
  
   });
  
   }

   onDelete(id_panne){
    if (confirm("Vous êtes sûr de vouloir supprimer cette panne")) {
      this.panneService.deletePanne(id_panne).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getPannes();
      },error=>{
        console.log(error);
      });
    }
    this.getPannes();
  }

  onAjoutIntervention(id_panne){

    if (confirm("Vous êtes sûr de vouloir intervenir sur cette panne")) {
      
      this.interventionService.initializeFormForPost(id_panne);
    
      this.dialog.open(AddeditInterventionComponent).afterClosed().subscribe(res => {
        this.getPannes();
      }
  
    );
    }
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
get isUser() {
  return this.user && this.user.role === Role.User;
}
}

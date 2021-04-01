import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { InterventionService } from 'app/Core/intervention/intervention.service';
import { Validators, FormBuilder, NgForm } from '@angular/forms';
import { Panne } from 'app/Core/panne/panne.model';
import { FournisseurService } from 'app/Core/fournisseur/fournisseur.service';
import { PanneService } from 'app/Core/panne/panne.service';
import { TypePanneService } from 'app/Core/type_panne/type-panne.service';
import { TypePanne } from 'app/Core/type_panne/type-panne.model';
import { TypeInterventionService } from 'app/Core/typeIntervention/type-intervention.service';
import { TypeIntervention } from 'app/Core/typeIntervention/type-intervention.model';
import { Fournisseur } from 'app/Core/fournisseur/fournisseur.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import * as moment from 'moment';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addedit-intervention',
  templateUrl: './addedit-intervention.component.html',
  styleUrls: ['./addedit-intervention.component.css'],
})



export class AddeditInterventionComponent implements OnInit {

  constructor(  
    public fournisseurService:FournisseurService,
    public typeInterventionService:TypeInterventionService,
    public panneService: PanneService,
    public interventionService:InterventionService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditInterventionComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getPannes();
    this.getTypeIntervention();
    this.getFournisseurs();

  }

  pannes:Panne[];
  typeIntervention:TypeIntervention[];
  fournisseurs:Fournisseur[];
  id_fournisseur;
  
 getPannes(){
  this.panneService.getPanne().subscribe(
    data=>{
      this.pannes=data as Panne[];
      console.log(data);
    },error=>{
      console.log(error)
    }
  )
  
}
getTypeIntervention(){
  this.typeInterventionService.getTypeIntervention().subscribe(
    data=>{
      this.typeIntervention=data as TypeIntervention[]; 
      console.log(data);
    },error=>{
      console.log(error)
    }
  )
}
getFournisseurs(){
  this.fournisseurService.getFournisseur().subscribe(
    data=>{
      this.fournisseurs=data as Fournisseur[];
      console.log(data);
    },error=>{
      console.log(error)
    }
  )
}
onSubmit(){
 
  if (
    this.interventionService.form.controls.id_intervention.value ==
    "00000000-0000-0000-0000-000000000000"
  ) {
    this.PostTypeo();
  } else {
    this.UpdateTypeo();
  }
}
d:Date;
PostTypeo(){

console.log(this.interventionService.form.value);


var d=this.interventionService.form.controls.date_intervention.value;
d=moment().format('DD/MM/yyyy');
this.interventionService.form.controls.date_intervention.setValue(d);
  this.interventionService.postIntervention().subscribe(data=>{
    this._snack.open("Ajout réussi",'X',{
      verticalPosition: 'top',
      duration: 2000,
      panelClass:'snack-succ'
    });
      
  },error=>{
    console.log(error)
    this._snack.open("Erreur", "X", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: "right",
      panelClass: 'snack-supp'
  });
  
})
}

UpdateTypeo(){
  this.interventionService.putIntervention().subscribe(data=>{
    this._snack.open("Ajout réussi",'X',{
      verticalPosition: 'top',
      duration: 2000,
      panelClass:'snack-succ'
    });
      
  },error=>{
    console.log(error)
    this._snack.open("Erreur", "X", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: "right",
      panelClass: 'snack-supp'
  });
  
})
}


}

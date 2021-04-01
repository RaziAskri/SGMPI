import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { InterventionService } from 'app/Core/intervention/intervention.service';
import {  FormBuilder } from '@angular/forms';

import { PanneService } from 'app/Core/panne/panne.service';

import { TypeInterventionService } from 'app/Core/typeIntervention/type-intervention.service';

@Component({
  selector: 'app-addedit-type-intervention',
  templateUrl: './addedit-type-intervention.component.html',
  styleUrls: ['./addedit-type-intervention.component.css']
})
export class AddeditTypeInterventionComponent implements OnInit {

  constructor(  

    public typeInterventionService:TypeInterventionService,
    public panneService: PanneService,
    public interventionService:InterventionService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditTypeInterventionComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
   

  }

  onSubmit(){
    if (
      this.typeInterventionService.form.controls.id_type_intervention.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostTypeo();
    } else {
      this.UpdateTypeo();
    }
  }

  
  PostTypeo(){
  
  
    this.typeInterventionService.postTypeIntervention().subscribe(data=>{
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
    this.typeInterventionService.putTypeIntervention().subscribe(data=>{
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
 
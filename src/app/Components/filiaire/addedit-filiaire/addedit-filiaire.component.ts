import { Component, OnInit } from '@angular/core';
import { FiliaireService } from 'app/Core/filiaire/filiaire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addedit-filiaire',
  templateUrl: './addedit-filiaire.component.html',
  styleUrls: ['./addedit-filiaire.component.css']
})
export class AddeditFiliaireComponent implements OnInit {

  constructor( public filiaireService:FiliaireService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditFiliaireComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }


  onSubmit(){
    if (
      this.filiaireService.form.controls.id_filiaire.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostTypeo();
    } else {
      this.UpdateTypeo();
    }
  }

  
  PostTypeo(){
  
  
    this.filiaireService.postFiliaire().subscribe(data=>{
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
    this.filiaireService.putFiliaire().subscribe(data=>{
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

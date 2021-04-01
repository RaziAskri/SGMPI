import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'app/Core/fournisseur/fournisseur.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-addedit-fournisseur',
  templateUrl: './addedit-fournisseur.component.html',
  styleUrls: ['./addedit-fournisseur.component.css']
})
export class AddeditFournisseurComponent implements OnInit {

  constructor(  public fournisseurService:FournisseurService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditFournisseurComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
  }


  onSubmit(){
    if (
      this.fournisseurService.form.controls.id_fournisseur.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostTypeo();
    } else {
      this.UpdateTypeo();
    }
  }
  
  PostTypeo(){
  
  
    this.fournisseurService.postFournisseur().subscribe(data=>{
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
    this.fournisseurService.putFournisseur().subscribe(data=>{
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

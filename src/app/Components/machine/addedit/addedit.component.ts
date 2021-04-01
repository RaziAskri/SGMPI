import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MachineService } from 'app/Core/machine/machine.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Fournisseur } from 'app/Core/fournisseur/fournisseur.model';
import { FournisseurService } from 'app/Core/fournisseur/fournisseur.service';
@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {

  constructor(
    public fournisseurservice: FournisseurService,
    public machineService:MachineService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getFournisseurs();
  }

fournisseurs:Fournisseur[];
 getFournisseurs(){
  this.fournisseurservice.getFournisseur().subscribe(
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
    this.machineService.form.controls.id_machine.value ==
    "00000000-0000-0000-0000-000000000000"
  ) {
    this.PostTypeo();
  } else {
    this.UpdateTypeo();
  }
}

PostTypeo(){


  this.machineService.postMachine().subscribe(data=>{
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
  this.machineService.putMachine().subscribe(data=>{
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
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'app/Core/service/service.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Filiaire } from 'app/Core/filiaire/filiaire.model';
import { FiliaireService } from 'app/Core/filiaire/filiaire.service';

@Component({
  selector: 'app-addedit-service',
  templateUrl: './addedit-service.component.html',
  styleUrls: ['./addedit-service.component.css']
})
export class AddeditServiceComponent implements OnInit {

  constructor( public filiaireservice: FiliaireService,
    public serviceService:ServiceService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditServiceComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getFiliaires();

  }
  filiaires:Filiaire[];

  getFiliaires(){
    this.filiaireservice.getFiliaire().subscribe(
      data=>{
        this.filiaires=data as Filiaire[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  onSubmit(){
    if (
      this.serviceService.form.controls.id_service.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostTypeo();
    } else {
      this.UpdateTypeo();
    }
  }

  PostTypeo(){


    this.serviceService.postService().subscribe(data=>{
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
    this.serviceService.putService().subscribe(data=>{
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

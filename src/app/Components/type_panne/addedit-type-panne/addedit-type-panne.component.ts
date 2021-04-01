import { Component, OnInit } from '@angular/core';
import { MachineService } from 'app/Core/machine/machine.service';
import { TypePanne } from 'app/Core/type_panne/type-panne.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Panne } from 'app/Core/panne/panne.model';
import { PanneService } from 'app/Core/panne/panne.service';
import { AddeditPanneComponent } from 'app/Components/panne/addedit-panne/addedit-panne.component';
import { MajPanneComponent } from 'app/Components/panne/maj-panne/maj-panne.component';
import { TypePanneService } from 'app/Core/type_panne/type-panne.service';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-addedit-type-panne',
  templateUrl: './addedit-type-panne.component.html',
  styleUrls: ['./addedit-type-panne.component.css']
})
export class AddeditTypePanneComponent implements OnInit {

  constructor(   
    public type_panneService:TypePanneService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditPanneComponent>, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if (
      this.type_panneService.form.controls.id_type_panne.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostTypeo();
    } else {
      this.UpdateTypeo();
    }
  }
  
  PostTypeo(){
  
  
    this.type_panneService.postTypePanne().subscribe(data=>{
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
    this.type_panneService.putTypePanne().subscribe(data=>{
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

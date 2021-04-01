import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';
import { Machine } from 'app/Core/machine/machine.model';
import { MachineService } from 'app/Core/machine/machine.service';
import { Panne } from 'app/Core/panne/panne.model';
import { PanneService } from 'app/Core/panne/panne.service';



@Component({
  selector: 'app-maj-panne',
  templateUrl: './maj-panne.component.html',
  styleUrls: ['./maj-panne.component.css']
})
export class MajPanneComponent implements OnInit {

  constructor( 
    // public type_panneservice: Type_panneService,
    public machineservice: MachineService,
    public panneService:PanneService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<MajPanneComponent >, 
    private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getPannes();

  }
  pannes:Panne[];

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

  onSubmit(){
    if (
      this.panneService.form.controls.id_machine.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.PostTypeo();
    } else {
      this.UpdateTypeo();
    }
  }

  PostTypeo(){


    this.panneService.postPanne().subscribe(data=>{
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
    this.panneService.putPanne().subscribe(data=>{
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

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { PanneService } from 'app/Core/panne/panne.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Machine } from 'app/Core/machine/machine.model';
import { MachineService } from 'app/Core/machine/machine.service';
import { TypePanne } from 'app/Core/type_panne/type-panne.model';
import { TypePanneService } from 'app/Core/type_panne/type-panne.service';


@Component({
  selector: 'app-addedit-panne',
  templateUrl: './addedit-panne.component.html',
  styleUrls: ['./addedit-panne.component.css']
})
export class AddeditPanneComponent implements OnInit {

  constructor( 
    public machineservice: MachineService,
    public type_panneservice: TypePanneService,
    public panneService:PanneService,
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<AddeditPanneComponent>, 
    private _snack:MatSnackBar) { }
    
machine:Machine;
typepannes:TypePanne[];
  ngOnInit(): void {
    console.log(this.panneService.form.value)
        this.getMachines();
       this.getType_panne();
this.machineservice.getMachineById(this.panneService.form.controls.id_machine.value).subscribe(
  data=>{
    this.machine=data as Machine;

    
 
  }
);
  }
  machines:Machine[];
  type_pannes:TypePanne[];


 getMachines(){
  this.machineservice.getMachine().subscribe(
    data=>{
      this.machines=data as Machine[];
   
    },error=>{
      console.log(error)
    }
  )
  
}
//--------------------------------------------------

getType_panne(){
  this.type_panneservice.getTypePanne().subscribe(
    data=>{
      this.type_pannes=data as TypePanne[];
      console.log(data);
    },error=>{
      console.log(error)
    }
  )
  
}



//--------------------------------------------------
onSubmit(){
  if (
    this.panneService.form.controls.id_machine.value ==
    "00000000-0000-0000-0000-000000000000"
  ) {
    this.PostTypeo();
  } else {
    this.UpdateTypeo();
  }
  this.machine.etat_machine="en panne";
  this.machineservice.initializeFormForEdit(this.machine);
  this.machineservice.putMachine().subscribe(data=>{
    this._snack.open("Machine en Panne",'X',{
      verticalPosition: 'top',
      duration: 2000,
      panelClass:'snack-succ'
    });
      
  },error=>{
    console.log(error)
    this._snack.open("Erreur panne Machine", "X", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: "right",
      panelClass: 'snack-supp'
  });
  
})
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

etat_panne: ['En panne']

}

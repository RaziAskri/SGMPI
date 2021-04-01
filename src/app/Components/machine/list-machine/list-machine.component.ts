import { Component, OnInit } from '@angular/core';
import { MachineService } from 'app/Core/machine/machine.service';
import { Machine } from 'app/Core/machine/machine.model';
import { MatDialog } from '@angular/material/dialog';
import { AddeditComponent } from '../addedit/addedit.component';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { PanneService } from 'app/Core/panne/panne.service';
import { MajPanneComponent } from 'app/Components/panne/maj-panne/maj-panne.component';
import { AddeditPanneComponent } from 'app/Components/panne/addedit-panne/addedit-panne.component';
import {ButtonModule} from 'primeng/button';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';

@Component({
  selector: 'app-list-machine',
  templateUrl: './list-machine.component.html',
  styleUrls: ['./list-machine.component.css']
})
export class ListMachineComponent implements OnInit {
  user: User;
 
  constructor(
    public panneService:PanneService,
    public machineService:MachineService,
    private dialog:MatDialog,
    private _snack:MatSnackBar   ,
    private authenticationService: AuthenticationService,
                          
    ) { 
     
this.authenticationService.currentUser.subscribe(x => this.user = x);

    }

    machineEnPanne: Machine[];
    machineFonctionne: Machine[];
 machines:Machine[]
  ngOnInit(): void {
    this.getMachineEnPanne();
    this.getMachineFonctionne();

  }

getMachineEnPanne(){
  this.machineService.getMachineEnPanne().subscribe(
    data=>{
      this.machineEnPanne=data as Machine[];
      console.log(data);
    },error=>{
      console.log(error)
    }
  )
  
}


getMachineFonctionne(){
  this.machineService.getMachineFonctionne().subscribe(
    data=>{
      this.machineFonctionne=data as Machine[];
      console.log(data);
    },error=>{
      console.log(error)
    }
  )
  
}

openComponentForPost(){
  this.machineService.initializeFormForPost();
  this.dialog.open(AddeditComponent).afterClosed().subscribe(res => {
    this.getMachineFonctionne();

 });
}

openComponentForUpdate(Machine: Machine) {
  this.machineService.initializeFormForEdit(Machine);
  this.dialog.open(AddeditComponent,{  width: '500px',}).afterClosed().subscribe(res => {
    this.getMachineFonctionne();

 });

 }


onAjoutPanne(id_machine){

  if (confirm("Vous êtes sûr de vouloir mettre cette machine en panne")) {
    
    this.panneService.initializeFormForPost(id_machine);
  
    this.dialog.open(AddeditPanneComponent).afterClosed().subscribe(res => {
      this.getMachineEnPanne();
    }

  );
  }
}

activationMachine(machine){
  if (confirm("Vous êtes sûr de vouloir rendre cette machine inactive ?")) {
    machine.activation="inactive";
    this.machineService.initializeFormForEdit(machine);

    this.machineService.putMachine().subscribe(data=>{
    this._snack.open("machine desormée inactive",'x',{
    verticalPosition: 'top',
    duration: 2000,
    panelClass: 'snack-'
  });
  this.getMachineFonctionne();
  this.getMachineEnPanne();
}, error=>{
  console.log(error);
});


  }
}

get isAdmin() {
  return this.user && this.user.role === Role.Admin;
}
get isUser() {
return this.user && this.user.role === Role.User;
}
}

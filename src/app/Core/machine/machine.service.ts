import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Machine } from './machine.model';



@Injectable({
  providedIn: 'root'
})


export class MachineService {

  form = new FormGroup({ 
    id_machine :new FormControl(""),
    label:new FormControl('', Validators.required),
    type_machine:new FormControl('', Validators.required),
    etat_machine:new FormControl('', Validators.required),
    id_fournisseur:new FormControl(''),
    activation:new FormControl('', Validators.required),
    
    })


  
  initializeFormForPost() {
    this.form.setValue({
      id_machine: '00000000-0000-0000-0000-000000000000',
      label:'',
      type_machine:'',
      etat_machine:'',
      id_fournisseur:'',
      activation:'active',
  
  
    });
   }

  initializeFormForEdit(machine:Machine){
    this.form.setValue({
      id_machine: machine.id_machine,
      label:machine.label,
      type_machine:machine.type_machine,
      etat_machine:machine.etat_machine,
      id_fournisseur:machine.id_fournisseur,
      activation:machine.activation,
  
    });
  
  }
  constructor(private http: HttpClient) { }

    getMachine(){
        
      return this.http.get(environment.machineApi + 'Machine/GetMachineDTO') ;
    }

    getMachineEnPanne(){
        
      return this.http.get(environment.machineApi + 'Machine/GetMachineEnPanne') ;
    }

    getMachineFonctionne(){
        
      return this.http.get(environment.machineApi + 'Machine/GetMachineFonctionne') ;
    }

    getMachineById(id_machine){
  return this.http.get(environment.machineApi + 'Machine/GetMachineById?id='+id_machine) ;
    }

  //  deleteMachine(id_machine){
  //   return this.http
  //     .delete(environment.machineApi+ "Machine/RemoveMachine?id=" + id_machine,
  //       { responseType: "text" });
  //   }

    postMachine() {
      return this.http
        .post(environment.machineApi+ "Machine/PostMachine",this.form.value,
          { responseType: "text" }
        );
    }  

    putMachine(){ 
      console.log(this.form.value);
      return this.http
        .put(environment.machineApi + "Machine/PutMachine",this.form.value,
          { responseType: "text" }
        );
    }


   

}




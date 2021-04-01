import { Injectable } from '@angular/core';
//import { Typed} from '../model/typed.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Service } from './service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  form = new FormGroup({ 
    id_service :new FormControl(""),
    label:new FormControl('', Validators.required),
    id_filiaire:new FormControl(''),   
    
    
    })

    initializeFormForPost() {
      this.form.setValue({
        id_service: '00000000-0000-0000-0000-000000000000',
        label:'',
        id_filiaire:'',
    
    
      });
     }

     initializeFormForEdit(service:Service){
      this.form.setValue({
        id_service: service.id_service,
        label:service.label,
        id_filiaire:service.id_filiaire,
    
      });
    
    }

  constructor(private http: HttpClient) { }

  getService(){
        
    return this.http.get(environment.machineApi + 'Service/GetService') ;
  }

  deleteService(id_service){
    return this.http
      .delete(environment.machineApi+ "Service/RemoveService?id=" + id_service,
        { responseType: "text" });
    }

    postService() {
      return this.http
        .post(environment.machineApi+ "Service/PostService",this.form.value,
          { responseType: "text" }
        );
    }  

    putService(){ 
      console.log(this.form.value);
      return this.http
        .put(environment.machineApi + "Service/PutService",this.form.value,
          { responseType: "text" }
        );
    }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { TypePanne } from './type-panne.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypePanneService {

  
  form = new FormGroup({ 
    id_type_panne :new FormControl(""),
    label:new FormControl('', Validators.required),
    priorite:new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient) { }

  initializeFormForPost() {
    this.form.setValue({
      id_type_panne: '00000000-0000-0000-0000-000000000000',
      label:'',
      priorite:'',
  
    });
   }

   initializeFormForEdit(type_panne:TypePanne){
    this.form.setValue({
      id_type_panne: type_panne.id_type_panne,
      label:type_panne.label,
      priorite:type_panne.priorite,
      
  
    });
  
  }

  getTypePanne(){
        
    return this.http.get(environment.panneApi + 'Type_panne/GetType_panne') ;
  }
  
  deleteTypePanne(id_type_panne){
    return this.http
      .delete(environment.panneApi+ "Type_panne/RemoveType_panne?id=" + id_type_panne,
        { responseType: "text" });
    }

    postTypePanne() {
      return this.http
        .post(environment.panneApi+ "Type_panne/PostType_panne",this.form.value,
          { responseType: "text" }
        );
    }  
  
    putTypePanne(){ 
      console.log(this.form.value);
      return this.http
        .put(environment.panneApi + "Type_panne/PutType_panne",this.form.value,
          { responseType: "text" }
        );
    }

}

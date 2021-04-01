import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { TypeIntervention } from './type-intervention.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeInterventionService {

  form = new FormGroup({ 
    id_type_intervention :new FormControl(""),
    type_intervention:new FormControl('', Validators.required),
    etat_intervention:new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient) { }


  initializeFormForPost() {
    this.form.setValue({
      id_type_intervention: '00000000-0000-0000-0000-000000000000',
      type_intervention:'',
      etat_intervention:'',
  
    });
   }

   initializeFormForEdit(typeIntervention:TypeIntervention){
    this.form.setValue({
      id_type_intervention: typeIntervention.id_type_intervention,
      type_intervention: typeIntervention.type_intervention,
      etat_intervention: typeIntervention.etat_intervention,
  
    });
  
  }

  getTypeIntervention(){
        
    return this.http.get(environment.panneApi + 'Type_intervention/GetType_intervention') ;
  }
  
  deleteTypeIntervention(id_type_intervention){
    return this.http
      .delete(environment.panneApi+ "Type_intervention/RemoveType_intervention?id=" + id_type_intervention,
        { responseType: "text" });
    }

    postTypeIntervention() {
      return this.http
        .post(environment.panneApi+ "Type_intervention/PostType_intervention",this.form.value,
          { responseType: "text" }
        );
    }  
  
    putTypeIntervention(){ 
      console.log(this.form.value);
      return this.http
        .put(environment.panneApi + "Type_intervention/PutType_intervention",this.form.value,
          { responseType: "text" }
        );
    }

}

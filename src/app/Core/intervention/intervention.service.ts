import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Intervention } from './intervention.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  form = new FormGroup({ 
    id_intervention :new FormControl(""),
    date_intervention:new FormControl('', Validators.required),
    duree:new FormControl('', Validators.required),
    description_intervention:new FormControl('', Validators.required),
    id_panne :new FormControl(""),
    idTypeIntervention :new FormControl(""),
    etatIntervention :new FormControl(""),
    dateFin :new FormControl(""),



    })

    initializeFormForPost(id_panne) {
      this.form.setValue({
        id_intervention: '00000000-0000-0000-0000-000000000000',
        date_intervention:'',
        duree:'',
        description_intervention:'',
        id_panne:id_panne, 
        idTypeIntervention:'',
        etatIntervention:'',
        dateFin:'',

    
      });
     }
  
    initializeFormForEdit(intervention:Intervention){
      this.form.setValue({
        id_intervention: intervention.id_intervention,
        date_intervention:intervention.date_intervention,
        duree:intervention.duree.toString(),
        description_intervention:intervention.description_intervention,
        id_panne:intervention.id_panne,
        idTypeIntervention: intervention.idTypeIntervention,
        etatIntervention: intervention.etatIntervention,
        dateFin: intervention.dateFin,
    
      });
    
    }

    
  constructor(private http: HttpClient) { }

  getIntervention(){
        
    return this.http.get(environment.panneApi + 'Intervention/GetIntervention') ;
  }

  getInterventionAchevee(){
        
    return this.http.get(environment.panneApi + 'Intervention/GetInterventionAchevee') ;
  }

  getInterventionNonAchevee(){
        
    return this.http.get(environment.panneApi + 'Intervention/GetInterventionNonAchevee') ;
  }

getInterventionById(id_intervention){
return this.http.get(environment.panneApi + 'Intervention/GetInterventionById?id'+id_intervention) ;
}

deleteIntervention(id_intervention){
  return this.http
    .delete(environment.panneApi+ "Intervention/RemoveIntervention" + id_intervention,
      { responseType: "text" });
  }

  postIntervention() {
    return this.http
      .post(environment.panneApi+ "Intervention/PostIntervention",this.form.value,
        { responseType: "text" }
      );
  }  

  putIntervention(){ 
    console.log(this.form.value);
    return this.http
      .put(environment.panneApi + "Intervention/PutIntervention",this.form.value,
        { responseType: "text" }
      );
  }
}

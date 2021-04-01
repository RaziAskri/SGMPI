import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Interne } from './interne.model';

@Injectable({
  providedIn: 'root'
})
export class InterneService {

  form = new FormGroup({ 
    id_interne :new FormControl(""),
    matricule:new FormControl('', Validators.required),
    id_intervention:new FormControl('', Validators.required)

    
    })

    initializeFormForPost() {
      this.form.setValue({
        id_interne: '00000000-0000-0000-0000-000000000000',
        matricule:'',
        id_intervention:'',

      });
     }

     initializeFormForEdit(interne:Interne){
      this.form.setValue({
        id_interne: interne.id_interne,
        matricule:interne.matricule,
        id_intervention:interne.id_intervention,
        
    
      });
    }
    
      constructor(private http: HttpClient) { }

      getInterne(){
            
        return this.http.get(environment.panneApi + 'GetInterne') ;
      }
    
    deleteInterne(id_interne){
      return this.http
        .delete(environment.panneApi+ "RemoveInterne?id=" + id_interne,
          { responseType: "text" });
      }
    
      postInterne() {
        return this.http
          .post(environment.panneApi+ "PostInterne",this.form.value,
            { responseType: "text" }
          );
      }  
    
      putInterne(){ 
        console.log(this.form.value);
        return this.http
          .put(environment.panneApi + "PutInterne",this.form.value,
            { responseType: "text" }
          );
      }
    }
    
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Externe } from './externe.model';

@Injectable({
  providedIn: 'root'
})
export class ExterneService {

  form = new FormGroup({ 
    id_externe :new FormControl(""),
    id_fournisseur:new FormControl('', Validators.required),
    id_intervention:new FormControl('', Validators.required)

    
    })

    initializeFormForPost() {
      this.form.setValue({
        id_externe: '00000000-0000-0000-0000-000000000000',
        id_fournisseur:'',
        id_intervention:'',

      });
     }

     initializeFormForEdit(externe:Externe){
      this.form.setValue({
        id_Externe: externe.id_externe,
        id_fournisseur:externe.id_fournisseur,
        id_intervention:externe.id_intervention,
        
    
      });
    }
    
      constructor(private http: HttpClient) { }

      getExterne(){
            
        return this.http.get(environment.panneApi + 'Externe/GetExterne') ;
      }
    
    deleteExterne(id_Externe){
      return this.http
        .delete(environment.panneApi+ "Externe/RemoveExterne?id=" + id_Externe,
          { responseType: "text" });
      }
    
      postExterne() {
        return this.http
          .post(environment.panneApi+ "Externe/PostExterne",this.form.value,
            { responseType: "text" }
          );
      }  
    
      putExterne(){ 
        console.log(this.form.value);
        return this.http
          .put(environment.panneApi + "Externe/PutExterne",this.form.value,
            { responseType: "text" }
          );
      }
    }
    
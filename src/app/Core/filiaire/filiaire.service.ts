import { Injectable } from '@angular/core';
//import { Typed} from '../model/typed.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Filiaire } from './filiaire.model';

@Injectable({
  providedIn: 'root'
})
export class FiliaireService {

  form = new FormGroup({ 
    id_filiaire :new FormControl(""),
    label:new FormControl('', Validators.required),
    
    })

    initializeFormForPost() {
      this.form.setValue({
        id_filiaire: '00000000-0000-0000-0000-000000000000',
        label:'',

      });
     }

     initializeFormForEdit(filiaire:Filiaire){
      this.form.setValue({
        id_filiaire: filiaire.id_filiaire,
        label:filiaire.label,
        
    
      });
    
    }

  constructor(private http: HttpClient) { }

  getFiliaire(){
        
    return this.http.get(environment.machineApi + 'Filiaire/GetFiliaire') ;
  }

deleteFiliaire(id_filiaire){
  return this.http
    .delete(environment.machineApi+ "Filiaire/RemoveFiliaire?id=" + id_filiaire,
      { responseType: "text" });
  }

  postFiliaire() {
    return this.http
      .post(environment.machineApi+ "Filiaire/PostFiliaire",this.form.value,
        { responseType: "text" }
      );
  }  

  putFiliaire(){ 
    console.log(this.form.value);
    return this.http
      .put(environment.machineApi + "Filiaire/PutFiliaire",this.form.value,
        { responseType: "text" }
      );
  }
}

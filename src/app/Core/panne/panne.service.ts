import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Panne } from './panne.model';

@Injectable({
  providedIn: 'root'
})
export class PanneService {

  form = new FormGroup({ 
    id_panne :new FormControl(""),
    etat_panne:new FormControl('', Validators.required),
    description:new FormControl('', Validators.required),
    id_type_panne:new FormControl('', Validators.required),
    id_machine:new FormControl(''),
    
    })

    initializeFormForPost(id_machine) {
    
      this.form.setValue({
        id_panne: '00000000-0000-0000-0000-000000000000',
        etat_panne:'',
        description:'',
        id_type_panne:'',
        id_machine:id_machine,
    
    
      });
     }

     

     initializeFormForEdit(panne:Panne){
      this.form.setValue({
        id_panne: panne.id_panne,
        etat_panne: panne.etat_panne,
        description: panne.description,
        id_type_panne: panne.id_type_panne,
        id_machine: panne.id_machine,
    
      });
    
    }


  constructor(private http: HttpClient) { }

  getPanne(){
        
    return this.http.get(environment.panneApi + 'Panne/GetPanne') ;
  }
  getNbrPannesParMachine(){
        
    return this.http.get(environment.panneApi + 'Panne/GetNombrePannneparMachine') ;
  }
  getPanneById(id_panne){
        
    return this.http.get(environment.panneApi + 'Panne/GetPanneById?id='+id_panne) ;
  }

  getPanneDTO(){
        
    return this.http.get(environment.panneApi + 'Panne/GetPanneDTO') ;
  }
  
  deletePanne(id_panne){
    return this.http
      .delete(environment.panneApi+ "Panne/RemovePanne?id=" + id_panne,
        { responseType: "text" });
    }

    
    postPanne() {
      return this.http
        .post(environment.panneApi+ "Panne/PostPanne",this.form.value,
          { responseType: "text" }
        );
    }  

    putPanne(){ 
      console.log(this.form.value);
      return this.http
        .put(environment.panneApi + "Panne/PutPanne",this.form.value,
          { responseType: "text" }
        );
    }

}

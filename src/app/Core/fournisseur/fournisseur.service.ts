import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Fournisseur } from './fournisseur.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  form = new FormGroup({ 
    id_fournisseur :new FormControl(""),
    label:new FormControl('', Validators.required),
    adresse_fournisseur:new FormControl('', Validators.required),
    email:new FormControl('', Validators.required),

  })
    

constructor(private http: HttpClient) { }

initializeFormForPost() {
  this.form.setValue({
    id_fournisseur: '00000000-0000-0000-0000-000000000000',
    label:'',
    adresse_fournisseur:'',
    email:'',


  });
 }

 initializeFormForEdit(fournisseur:Fournisseur){
  this.form.setValue({
    id_fournisseur: fournisseur.id_fournisseur,
    label:fournisseur.label,
    adresse_fournisseur:fournisseur.adresse_fournisseur,
    email:fournisseur.email, 

  });

}

getFournisseur(){
        
  return this.http.get(environment.machineApi + 'Fournisseur/GetFournisseur') ;
}

getFournisseurById(){
        
  return this.http.get(environment.machineApi + 'Fournisseur/GetFournisseurById?id') ;
}

getNbrMachineParFournisseur(){
        
  return this.http.get(environment.machineApi + 'Fournisseur/GetNombreFournisseurparMachine') ;
}


deleteFournisseur(id_fournisseur){
  return this.http
    .delete(environment.machineApi+ "Fournisseur/RemoveFournisseur?id=" + id_fournisseur,
      { responseType: "text" });
  }

  postFournisseur() {
    return this.http
      .post(environment.machineApi+ "Fournisseur/PostFournisseur",this.form.value,
        { responseType: "text" }
      );
  }  

  putFournisseur(){ 
    console.log(this.form.value);
    return this.http
      .put(environment.machineApi + "Fournisseur/PutFournisseur",this.form.value,
        { responseType: "text" }
      );
  }

}


import { Component, OnInit } from '@angular/core';
import{ FournisseurService} from 'app/Core/fournisseur/fournisseur.service';
import { Fournisseur } from 'app/Core/fournisseur/fournisseur.model';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { AddeditFournisseurComponent } from '../addedit-fournisseur/addedit-fournisseur.component';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import {AuthenticationService } from 'app/components/_services/authentication.service'

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {
  currentUser: User;

  constructor( public fournisseurservice: FournisseurService,
               private dialog:MatDialog,
              private _snack:MatSnackBar,
              private authenticationService: AuthenticationService,
                          
    ) { 
     
this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }

    fournisseurs:Fournisseur[]

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs(){
    this.fournisseurservice.getFournisseur().subscribe(
      data=>{
        this.fournisseurs=data as Fournisseur[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  openComponentForPost(){
    this.fournisseurservice.initializeFormForPost();
    this.dialog.open(AddeditFournisseurComponent).afterClosed().subscribe(res => {
      this.getFournisseurs();
  
   });
  }

  openComponentForUpdate(Machine: Fournisseur) {
    this.fournisseurservice.initializeFormForEdit(Machine);
    this.dialog.open(AddeditFournisseurComponent).afterClosed().subscribe(res => {
      this.getFournisseurs();
  
   });
  
   }

   onDelete(id_fournisseur){
    if (confirm("Vous êtes sûr de vouloir supprimer cette machine")) {
      this.fournisseurservice.deleteFournisseur(id_fournisseur).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getFournisseurs();
      },error=>{
        console.log(error);
      });
    }
    this.getFournisseurs();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
}
get isUser() {
  return this.currentUser && this.currentUser.role === Role.User;
}

}

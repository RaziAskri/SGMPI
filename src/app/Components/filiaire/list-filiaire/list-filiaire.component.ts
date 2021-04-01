import { Component, OnInit } from '@angular/core';
import{ FiliaireService} from 'app/Core/filiaire/filiaire.service';
import { Filiaire } from 'app/Core/filiaire/filiaire.model';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { AddeditFiliaireComponent } from '../addedit-filiaire/addedit-filiaire.component';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';

@Component({
  selector: 'app-list-filiaire',
  templateUrl: './list-filiaire.component.html',
  styleUrls: ['./list-filiaire.component.css']
})
export class ListFiliaireComponent implements OnInit {
  user: User;

  constructor( public filiaireservice: FiliaireService,
    private dialog:MatDialog,
   private _snack:MatSnackBar,
   private authenticationService: AuthenticationService,
   ) {
    this.authenticationService.currentUser.subscribe(x => this.user = x);

    }

   filiaires: Filiaire[]

  ngOnInit(): void {
      this.getFiliaires();
  }

  getFiliaires(){
    this.filiaireservice.getFiliaire().subscribe(
      data=>{
        this.filiaires=data as Filiaire[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  openComponentForPost(){
    this.filiaireservice.initializeFormForPost();
    this.dialog.open(AddeditFiliaireComponent).afterClosed().subscribe(res => {
      this.getFiliaires();
  
   });
  }

  openComponentForUpdate(Machine: Filiaire) {
    this.filiaireservice.initializeFormForEdit(Machine);
    this.dialog.open(AddeditFiliaireComponent).afterClosed().subscribe(res => {
      this.getFiliaires();
  
   });
  
   }

   onDelete(id_filiaire){
    if (confirm("Vous êtes sûr de vouloir supprimer cette machine")) {
      this.filiaireservice.deleteFiliaire(id_filiaire).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getFiliaires();
      },error=>{
        console.log(error);
      });
    }
    this.getFiliaires();
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
get isUser() {
  return this.user && this.user.role === Role.User;
}

}

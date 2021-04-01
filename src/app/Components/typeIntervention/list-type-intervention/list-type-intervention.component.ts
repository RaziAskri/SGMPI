import { Component, OnInit } from '@angular/core';
import{ TypeInterventionService} from 'app/Core/typeIntervention/type-intervention.service';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { TypeIntervention } from 'app/Core/typeIntervention/type-intervention.model';
import { AddeditTypeInterventionComponent } from '../addedit-type-intervention/addedit-type-intervention.component';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';



@Component({
  selector: 'app-list-type-intervention',
  templateUrl: './list-type-intervention.component.html',
  styleUrls: ['./list-type-intervention.component.css']
})
export class ListTypeInterventionComponent implements OnInit {
  user: User;

  constructor( 
    public typeInterventionservice: TypeInterventionService,
    private dialog:MatDialog,
   private _snack:MatSnackBar,
   private authenticationService: AuthenticationService,
   ) { 
    this.authenticationService.currentUser.subscribe(x => this.user = x);

   }

   typeInterventions: TypeIntervention[]

  ngOnInit(): void {
    this.getTypeInterventions();
  }

  getTypeInterventions(){
    this.typeInterventionservice.getTypeIntervention().subscribe(
      data=>{
        this.typeInterventions=data as TypeIntervention[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  openComponentForPost(){
    this.typeInterventionservice.initializeFormForPost();
    this.dialog.open(AddeditTypeInterventionComponent).afterClosed().subscribe(res => {
      this.getTypeInterventions();
  
   });
  }

  openComponentForUpdate(TypeIntervention: TypeIntervention) {
    this.typeInterventionservice.initializeFormForEdit(TypeIntervention);
    this.dialog.open(AddeditTypeInterventionComponent).afterClosed().subscribe(res => {
      this.getTypeInterventions();
  
   });
  
   }

   onDelete(id_type_intervention){
    if (confirm("Vous êtes sûr de vouloir supprimer ce type d'intervention")) {
      this.typeInterventionservice.deleteTypeIntervention(id_type_intervention).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getTypeInterventions();
      },error=>{
        console.log(error);
      });
    }
    this.getTypeInterventions();
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
get isUser() {
  return this.user && this.user.role === Role.User;
}
}

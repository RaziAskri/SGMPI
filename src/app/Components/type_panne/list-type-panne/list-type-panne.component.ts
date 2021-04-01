import { Component, OnInit } from '@angular/core';
import { MachineService } from 'app/Core/machine/machine.service';
import { TypePanne } from 'app/Core/type_panne/type-panne.model';
import { MatDialog } from '@angular/material/dialog';
import { AddeditTypePanneComponent } from '../addedit-type-panne/addedit-type-panne.component';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { Panne } from 'app/Core/panne/panne.model';
import { PanneService } from 'app/Core/panne/panne.service';
import { AddeditPanneComponent } from 'app/Components/panne/addedit-panne/addedit-panne.component';
import { MajPanneComponent } from 'app/Components/panne/maj-panne/maj-panne.component';
import { TypePanneService } from 'app/Core/type_panne/type-panne.service';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';

@Component({
  selector: 'app-list-type-panne',
  templateUrl: './list-type-panne.component.html',
  styleUrls: ['./list-type-panne.component.css']
})
export class ListTypePanneComponent implements OnInit {
  user: User;

  constructor( public type_panneService:TypePanneService,
    public panneService:PanneService,
    private dialog:MatDialog,
    private _snack:MatSnackBar,
    private authenticationService: AuthenticationService,
    ) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);

     }

    type_pannes:TypePanne[]


  ngOnInit(): void {
    this.getTypePannes();

  }

  getTypePannes(){
    this.type_panneService.getTypePanne().subscribe(
      data=>{
        this.type_pannes=data as TypePanne[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  openComponentForPost(){
    this.type_panneService.initializeFormForPost();
    this.dialog.open(AddeditTypePanneComponent).afterClosed().subscribe(res => {
      this.getTypePannes();
  
   });
  }
  
  openComponentForUpdate(TypePanne: TypePanne) {
    this.type_panneService.initializeFormForEdit(TypePanne);
    this.dialog.open(AddeditTypePanneComponent).afterClosed().subscribe(res => {
      this.getTypePannes();
  
   });
  
   }

   onDelete(id_type_panne){
    if (confirm("Vous êtes sûr de vouloir supprimer cette machine")) {
      this.type_panneService.deleteTypePanne(id_type_panne).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getTypePannes();
      },error=>{
        console.log(error);
      });
    }
    this.getTypePannes();
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
get isUser() {
  return this.user && this.user.role === Role.User;
}
}

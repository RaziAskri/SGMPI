import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'app/Core/service/service.service';
import { Service } from 'app/Core/service/service.model';
import { AddeditServiceComponent } from '../addedit-service/addedit-service.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'app/components/_models/user';
import { Role } from 'app/components/_models/role';
import { AuthenticationService } from 'app/components/_services/authentication.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  user: User;

  constructor( public serviceService:ServiceService,
    private dialog:MatDialog,
    private _snack:MatSnackBar,
    private authenticationService: AuthenticationService,
    ) {
      this.authenticationService.currentUser.subscribe(x => this.user = x);

     }
    services: Service[]

  ngOnInit(): void {
    this.getServices();

  }

  getServices(){
    this.serviceService.getService().subscribe(
      data=>{
        this.services=data as Service[];
        console.log(data);
      },error=>{
        console.log(error)
      }
    )
    
  }

  openComponentForPost(){
    this.serviceService.initializeFormForPost();
    this.dialog.open(AddeditServiceComponent).afterClosed().subscribe(res => {
      this.getServices();
  
   });
  }

  openComponentForUpdate(Service: Service) {
    this.serviceService.initializeFormForEdit(Service);
    this.dialog.open(AddeditServiceComponent).afterClosed().subscribe(res => {
      this.getServices();
  
   });
  
   }

   onDelete(id_service){
    if (confirm("Vous êtes sûr de vouloir supprimer cette machine")) {
      this.serviceService.deleteService(id_service).subscribe(data=>{
        this._snack.open("Suppression réussi",'X',{
          verticalPosition: 'top',
          duration: 2000,
          panelClass:'snack-supp'
        });
        this.getServices();
      },error=>{
        console.log(error);
      });
    }
    this.getServices();
  }
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
get isUser() {
  return this.user && this.user.role === Role.User;
}

}

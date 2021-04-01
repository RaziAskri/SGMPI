import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

import { Router } from '@angular/router';
import { AuthenticationService } from './components/_services/authentication.service';
import {  Role } from './components/_models/role';
import {  User } from './components/_models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
     user: User;
     constructor(
       public location: Location,
       private authenticationService: AuthenticationService
       ) {
        this.authenticationService.currentUser.subscribe(x => this.user = x);

       }
       get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }
    get isUser() {
      return this.user && this.user.role === Role.User;
  }

    logout() {
        this.authenticationService.logout();
    }

    ngOnInit(){
    }

    // isMap(path){
    //   var titlee = this.location.prepareExternalUrl(this.location.path());
    //   titlee = titlee.slice( 1 );
    //   if(path == titlee){
    //     return false;
    //   }
    //   else {
    //     return true;
    //   }
    // }
}

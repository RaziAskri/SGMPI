import { Component, OnInit } from '@angular/core';
import {  Role } from 'app/components/_models/role';
import { User } from 'app/components/_models/user';
import { AuthenticationService } from 'app/components/_services/authentication.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '', },
    { path: '/machine', title: 'Machines',  icon:'pe-7s-config', class: '' },
    { path: '/fournisseur', title: 'Fournisseurs',  icon:'fa fa-truck', class: '' },
    { path: '/filiaire', title: 'Filiaires',  icon:'fa fa-sitemap', class: '' },
    { path: '/service', title: 'Services',  icon:'pe-7s-note2', class: '' },
    { path: '/panne', title: 'Pannes',  icon:'fa fa-exclamation-triangle', class: '' },
    { path: '/type_panne', title: 'Types Pannes',  icon:'pe-7s-albums', class: '' },
    { path: '/intervention', title: 'Interventions',  icon:'fa fa-wrench', class: '' },
    { path: '/type_intervention', title: 'Types Interventions',  icon:'pe-7s-tools', class: '' }

    //<i class="fas fa-concierge-bell"></i>



];  
export const ROUTES2: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '', },
  { path: '/machine', title: 'Machines',  icon:'pe-7s-config', class: '' },
  { path: '/fournisseur', title: 'Fournisseurs',  icon:'fa fa-truck', class: '' },
  { path: '/filiaire', title: 'Filiaires',  icon:'fa fa-sitemap', class: '' },
  { path: '/service', title: 'Services',  icon:'pe-7s-note2', class: '' }
  

  //<i class="fas fa-concierge-bell"></i>



];  
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItems2:any[];
user:User;

  constructor( 
    private authentificationService:AuthenticationService,

  ) { }

  ngOnInit() {

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems2 = ROUTES2.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
}
get isUser() {
  return this.user && this.user.role === Role.User;
}
logout(){
  this.authentificationService.logout();        
}
}

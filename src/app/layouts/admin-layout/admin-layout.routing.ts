import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { AddeditInterventionComponent } from '../../Components/intervention/addedit-intervention/addedit-intervention.component'
import { ListMachineComponent } from '../../Components/machine/list-machine/list-machine.component';
import { AddeditComponent } from '../../Components/machine/addedit/addedit.component';
import { ListFournisseurComponent } from '../../Components/fournisseur/list-fournisseur/list-fournisseur.component';
import { AddeditFournisseurComponent } from '../../Components/fournisseur/addedit-fournisseur/addedit-fournisseur.component';
import { ListFiliaireComponent } from '../../Components/filiaire/list-filiaire/list-filiaire.component';
import { AddeditFiliaireComponent } from '../../Components/filiaire/addedit-filiaire/addedit-filiaire.component';
import { ListServiceComponent } from '../../Components/service/list-service/list-service.component';
import { AddeditPanneComponent } from '../../Components/panne/addedit-panne/addedit-panne.component';
import { ListPanneComponent } from '../../Components/panne/list-panne/list-panne.component';
import { AddeditServiceComponent } from '../../Components/service/addedit-service/addedit-service.component';
import { ListTypePanneComponent } from '../../Components/type_panne/list-type-panne/list-type-panne.component';
import { AddeditTypePanneComponent } from '../../Components/type_panne/addedit-type-panne/addedit-type-panne.component';
import { ListTypeInterventionComponent } from '../../Components/typeIntervention/list-type-intervention/list-type-intervention.component';
import {  AddeditTypeInterventionComponent } from '../../Components/typeIntervention/addedit-type-intervention/addedit-type-intervention.component';
import { ListInterventionComponent } from '../../Components/intervention/list-intervention/list-intervention.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    {path:'machine',component:ListMachineComponent,},
    {path:'addeditmachine',component:AddeditComponent},
  
    {path: 'fournisseur', component:ListFournisseurComponent},
    {path: 'addeditfournisseur', component:AddeditFournisseurComponent},
  
    {path: 'filiaire', component:ListFiliaireComponent},
    {path: 'addeditfiliaire', component:AddeditFiliaireComponent},
  
    {path: 'service', component:ListServiceComponent},
    {path: 'addeditservice', component:AddeditServiceComponent},
  
    {path: 'panne', component: ListPanneComponent},
    {path: 'addeditpanne', component: AddeditPanneComponent},
  
    {path: 'type_panne', component: ListTypePanneComponent},
    {path: 'addedittype_panne', component: AddeditTypePanneComponent},
  
    {path: 'type_intervention', component: ListTypeInterventionComponent},
    {path: 'addedittype_intervention', component: AddeditTypeInterventionComponent},
  
    {path: 'intervention', component: ListInterventionComponent},
    {path: 'addeditintervention', component: AddeditInterventionComponent}
];

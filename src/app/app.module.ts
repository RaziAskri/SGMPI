import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import {TableModule} from 'primeng/table';
import { AppComponent } from './app.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListMachineComponent } from './Components/machine/list-machine/list-machine.component';
import { ListFournisseurComponent } from './Components/fournisseur/list-fournisseur/list-fournisseur.component';
import { AddeditComponent } from './Components/machine/addedit/addedit.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddeditFournisseurComponent } from './Components/fournisseur/addedit-fournisseur/addedit-fournisseur.component';
import { AddeditFiliaireComponent } from './Components/filiaire/addedit-filiaire/addedit-filiaire.component';
import { ListFiliaireComponent } from './Components/filiaire/list-filiaire/list-filiaire.component';
import { ListServiceComponent } from './Components/service/list-service/list-service.component';
import { AddeditServiceComponent } from './Components/service/addedit-service/addedit-service.component';
import { ListPanneComponent } from './Components/panne/list-panne/list-panne.component';
import { AddeditPanneComponent } from './Components/panne/addedit-panne/addedit-panne.component';
import { MajPanneComponent } from './Components/panne/maj-panne/maj-panne.component';
import { AddeditTypePanneComponent } from './Components/type_panne/addedit-type-panne/addedit-type-panne.component';
import { ListTypePanneComponent } from './Components/type_panne/list-type-panne/list-type-panne.component';
import { ListInterventionComponent } from './Components/intervention/list-intervention/list-intervention.component';
import { AddeditInterventionComponent } from './Components/intervention/addedit-intervention/addedit-intervention.component';
import { ListTypeInterventionComponent } from './Components/typeIntervention/list-type-intervention/list-type-intervention.component';
import { AddeditTypeInterventionComponent } from './Components/typeIntervention/addedit-type-intervention/addedit-type-intervention.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ButtonModule} from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminComponent } from './Components/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ChartsModule } from 'ng2-charts';
// For MDB Angular Free
import {  WavesModule, ButtonsModule } from 'angular-bootstrap-md';


import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './components/_helpers/fake-backend';
import { JwtInterceptor } from './components/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './components/_helpers/error.interceptor';




@NgModule({
  
  imports: [
    MatNativeDateModule ,
    MatTabsModule,
    MatDatepickerModule,
    MatButtonModule,
    ButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    TableModule,
    WavesModule,
    ButtonsModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ListMachineComponent,
    ListFournisseurComponent,
    AddeditComponent,
    AddeditFournisseurComponent,
    AddeditFiliaireComponent,
    ListFiliaireComponent,
    ListServiceComponent,
    AddeditServiceComponent,
    ListPanneComponent,
    AddeditPanneComponent,
    MajPanneComponent,
    AddeditTypePanneComponent,
    ListTypePanneComponent,
    ListInterventionComponent,
    AddeditInterventionComponent,
    ListTypeInterventionComponent,
    AddeditTypeInterventionComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    JwPaginationComponent
 
  ],
  entryComponents:[AddeditComponent,AddeditPanneComponent],
  providers: [   
         MatDatepickerModule,
         { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

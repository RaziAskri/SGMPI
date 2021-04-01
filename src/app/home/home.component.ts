import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'app/Core/fournisseur/fournisseur.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Fournisseur } from 'app/Core/fournisseur/fournisseur.model';
import { Label } from 'ng2-charts';
import { PanneService } from 'app/Core/panne/panne.service';
import { Panne } from 'app/Core/panne/panne.model';
import { InterventionService } from 'app/Core/intervention/intervention.service';
import { Intervention } from 'app/Core/intervention/intervention.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fournisseurs:Fournisseur[];
  pannes:Panne[];
  interventionsAcheves:Intervention[];

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';




  public radarChartLabelsAcheves = [];

  public radarChartData = [
    {data: [], label: 'Durée de l"intervention'},
  ];
  public radarChartType = 'radar';


  constructor(
    public fournisseurservice: FournisseurService,
    public panneService: PanneService,
    public interventionService: InterventionService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Nombre machines par fournisseur'}
  ];
  public barChartLabels2 = [];
  public barChartType2 = 'bar';
  public barChartLegend2 = true;
  public barChartData2 = [
    {data: [], label: 'Nombre pannes par machine'}
  ];
  ngOnInit() {
    this.getFournisseurs();
    this.getPannes();
    this.getInterventionsAchevés();
 
  }
  getFournisseurs(){
    this.fournisseurservice.getNbrMachineParFournisseur().subscribe(
      data=>{
        this.fournisseurs=data as Fournisseur[];
        this.fournisseurs.forEach(fournisseur => {
          this.barChartLabels.push(fournisseur.label);
    this.barChartData[0].data.push(fournisseur.nbrMachine);
        });
      },error=>{
        console.log(error)
      }
    )
    
  }


  getPannes(){
    this.panneService.getNbrPannesParMachine().subscribe(
      data=>{
        this.pannes=data as Panne[];
        console.log(data);
        this.pannes.forEach(panne => {
          this.barChartLabels2.push(panne.label);
    this.barChartData2[0].data.push(panne.nbrPannes);
        });
      },error=>{
        console.log(error)
      }
    )
    
  }

  getInterventionsAchevés(){
    this.interventionService.getInterventionAchevee().subscribe(
      data=>{
        this.interventionsAcheves=data as Intervention[];
        console.log(data);
        this.interventionsAcheves.forEach(intervention => {
          this.radarChartLabelsAcheves.push(intervention.dateFin);
    this.radarChartData[0].data.push(intervention.duree);
        });
      },error=>{
        console.log(error)
      }
    )
    
  }


}
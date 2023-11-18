import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js'; 
import { SubscriptionService } from 'src/app/service/subscription.service'; 

@Component({
  selector: 'app-reporte-subscription',
  templateUrl: './reporte-subscription.component.html',
  styleUrls: ['./reporte-subscription.component.css']
})

  export class ReporteSubscriptionComponent implements OnInit{

    barChartOptions: ChartOptions = {
      responsive: true,
    };
    barChartLabels: string[] = [];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    constructor(private sS: SubscriptionService) {}
    ngOnInit(): void {
      this.sS.getdocs().subscribe((data) => {
        this.barChartLabels = data.map((item) => item.nameSubscription);
        this.barChartData=[
          {
            data:data.map(item=>item.countUsers),label:'Cantidad de Usuarios',
            backgroundColor:"#3bd980"
          }
        ]
      });
    }
  }
  

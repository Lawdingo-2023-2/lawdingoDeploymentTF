import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ProceedingService } from 'src/app/service/proceeding.service';

@Component({
  selector: 'app-proceeding-summary',
  templateUrl: './proceeding-summary.component.html',
  styleUrls: ['./proceeding-summary.component.css']
})
export class ProceedingSummaryComponent implements OnInit{

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private pS: ProceedingService) {}
  ngOnInit(): void {
    this.pS.getdocs().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.name_proceeding);
      this.barChartData=[
        {
          data:data.map(item=>item.num_doc),label:'Cantidad de documentos',
          backgroundColor:'rgba(255,0,0,0.5)'
        }
      ]
    });
  }
}

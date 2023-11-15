import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit{

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private cS: CategoryService) {}
  ngOnInit(): void {
    this.cS.getdocs().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameCategory);
      this.barChartData=[
        {
          data:data.map(item=>item.countConsultation),label:'Cantidad de Consultas',
          backgroundColor:"#7C70C7"
        }
      ]
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { DistrictService } from 'src/app/service/district.service';

@Component({
  selector: 'app-reporte-district',
  templateUrl: './reporte-district.component.html',
  styleUrls: ['./reporte-district.component.css']
})
export class ReporteDistrictComponent implements OnInit{

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private dS: DistrictService) {}
  ngOnInit(): void {
    this.dS.getdocs().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameDistrict);
      this.barChartData=[
        {
          data:data.map(item=>item.quantityProceeding),label:'Cantidad de Expedientes',
          backgroundColor:"#7C70C7"
        }
      ]
    });
  }
}

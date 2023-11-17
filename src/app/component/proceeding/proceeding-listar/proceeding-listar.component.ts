import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Proceeding } from 'src/app/model/proceeding';
import { ProceedingService } from 'src/app/service/proceeding.service';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-proceeding-listar',
  templateUrl: './proceeding-listar.component.html',
  styleUrls: ['./proceeding-listar.component.css'],
})
export class ProceedingListarComponent implements OnInit {
  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listaExpedientes: Proceeding[] = [];

  proValue(symbol: string): string {
    switch (symbol) {
      case 'O': {
        return 'Occupied';
      }
      case 'C': {
        return 'Closed';
      }
    }
    return 'Pending';
  }

  constructor(private cS: ProceedingService, private ls: LoginService) {}

  ngOnInit(): void {
    this.role = this.ls.showRole();
    this.cS.list().subscribe((data) => {
      this.listaExpedientes = data;

      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.listaExpedientes = data;

      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

  //filter(en: any) {    this.dataSource.filter = en.target.value.trim();  }
}

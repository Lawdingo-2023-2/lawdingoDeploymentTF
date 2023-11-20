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
  arrPro: Proceeding[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listaExpedientes: Proceeding[] = [];
  mensaje: string = 'Si no se puede eliminar un expediente es porque ya está registrado en alguna documentación';

  proValue(symbol: string): string {
    switch (symbol) {
      case 'O': {
        return 'Opened';
      }
      case 'C': {
        return 'Closed';
      }
    }
    return 'Pending';
  }

  constructor(private pS: ProceedingService, private ls: LoginService) {}

  ngOnInit(): void {
    this.role = this.ls.showRole();
    this.pS.list().subscribe((data) => {
      this.view(data);
      this.listaExpedientes = this.arrPro;

      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe((data) => {
      this.view(data);
      this.listaExpedientes = this.arrPro;

      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(id: number) {
    this.mensaje = '';
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
  view(data:any){
    if(this.role == 'ABOGADO'){
      for(let i=0;i<data.length;i++){
        if(data[i].lawyer.username==this.ls.showUsername()){
          this.arrPro.push(data[i])
        }
      };
    }
    else if(this.role == 'CLIENTE'){
      for(let i=0;i<data.length;i++){
        if(data[i].client.username==this.ls.showUsername()){
          this.arrPro.push(data[i])
        }
      };
    }
    else{
      this.arrPro = data;
    }
  }

}

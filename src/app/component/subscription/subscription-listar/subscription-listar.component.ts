import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'src/app/model/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-subscription-listar',
  templateUrl: './subscription-listar.component.html',
  styleUrls: ['./subscription-listar.component.css']
})
export class SubscriptionListarComponent implements OnInit {
    //AGREGACION DE ROL--------------------
    role:string="";
    ///////////////
  dataSource: MatTableDataSource<Subscription> = new MatTableDataSource();
  displayedColumns:  string[] = [
    'codigo', 
    'tipo de suscripcion', 
    'monto', 
    'fecha de inicio', 
    'usuario',
    'accion01',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private sS: SubscriptionService, private ls:LoginService ){
  }
  ngOnInit(): void {
        //AGREGACION DE ROL-------------------
        this.role=this.ls.showRole();
        //////////////
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
 
  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}



import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Certification } from 'src/app/model/certification';
import { CertificationService } from 'src/app/service/certification.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-certification-listar',
  templateUrl: './certification-listar.component.html',
  styleUrls: ['./certification-listar.component.css']
})
export class CertificationListarComponent implements OnInit{
  role: string = '';
  arrDoc: Certification[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listaCertificacion: Certification[] = [];

  constructor(private pS: CertificationService, private ls: LoginService) {}

  ngOnInit(): void {
    this.role = this.ls.showRole();
    this.pS.list().subscribe((data) => {
      this.view(data);
      this.listaCertificacion = data;
    });
    this.pS.getList().subscribe((data) => {
      this.view(data);
      this.listaCertificacion = data;
    });
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
  view(data:any){
    if(this.role == 'ABOGADO'){
      for(let i=0;i<data.length;i++){
        if(data[i].proceeding.lawyer.username==this.ls.showUsername()){
          this.arrDoc.push(data[i])
        }
      };
    }
    else{
      this.arrDoc = data;
    }
  }
}

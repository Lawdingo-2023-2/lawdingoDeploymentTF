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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listaCertificacion: Certification[] = [];

  constructor(private pS: CertificationService, private ls: LoginService) {}

  ngOnInit(): void {
    this.role = this.ls.showRole();
    this.pS.list().subscribe((data) => {
      this.listaCertificacion = data;
    });
    this.pS.getList().subscribe((data) => {
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
}

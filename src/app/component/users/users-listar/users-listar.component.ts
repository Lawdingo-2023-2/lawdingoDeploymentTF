import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Users } from 'src/app/model/users';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-users-listar',
  templateUrl: './users-listar.component.html',
  styleUrls: ['./users-listar.component.css'],
})
export class UsersListarComponent implements OnInit {
    //AGREGACION DE ROL--------------------
    role:string="";
    ///////////////
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = [
    'idUser',
    'username',
    'name',
    'email',
    'phone_num',
    'dni',
    'enabled',
    'lawyer',
    'accion01',

  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS: UsersService, private ls:LoginService) {}
  ngOnInit(): void {
        //AGREGACION DE ROL-------------------
        this.role=this.ls.showRole();
        //////////////
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }


  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
}

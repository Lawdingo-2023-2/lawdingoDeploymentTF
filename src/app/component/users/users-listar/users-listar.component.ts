import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Users } from 'src/app/model/users';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/model/role';
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
  arrUs:Users[]=[]
  arrRo:Role[]=[]
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

  constructor(private uS: UsersService, private ls:LoginService, private rS:RoleService) {}
  ngOnInit(): void {
        //AGREGACION DE ROL-------------------
        this.role=this.ls.showRole();
        this.rS.list().subscribe((data) => {
       this.arrRo=data;
        });
    this.uS.list().subscribe((data) => {
      this.filtro(data);
      this.dataSource = new MatTableDataSource(this.arrUs);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data) => {
      this.filtro(data);
      this.dataSource = new MatTableDataSource(this.arrUs);
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

 filtro(data:any){
    if(this.role == 'ABOGADO'){
      let roles:Role[]=[];
      for(let i=0;i<this.arrRo.length;i++){
        if(this.arrRo[i].rol =='CLIENTE'){
          roles.push(this.arrRo[i])
        }
      };
      for(let i=0;i<roles.length;i++){
        for(let j=0;j<data.length;j++){
        if(data[j].idUser==roles[i].user.idUser){
          this.arrUs.push(data[j])
        }
      };
    }
    }
    else if (this.role == 'CLIENTE'){
      let roles:Role[]=[];
      for(let i=0;i<this.arrRo.length;i++){
        if(this.arrRo[i].rol =='ABOGADO'){
          roles.push(this.arrRo[i])
        }
      };
      for(let i=0;i<roles.length;i++){
        for(let j=0;j<data.length;j++){
        if(data[j].idUser==roles[i].user.idUser){
          this.arrUs.push(data[j])
        }
      };

    }
    }
    else{
      this.arrUs = data;
    }

}
}

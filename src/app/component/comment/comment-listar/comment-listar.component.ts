import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from 'src/app/model/comment';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-comment-listar',
  templateUrl: './comment-listar.component.html',
  styleUrls: ['./comment-listar.component.css']
})
export class CommentListarComponent implements OnInit{
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource();
  arrCom: Comment[]=[];
  displayedColumns: string[] = [
    'codigo',
    'cliente',
    'abogado',
    'descripcion',
    'puntos',
    'accion01',
  ];

  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CommentService, private ls: LoginService) {}

  ngOnInit(): void {
    this.role = this.ls.showRole();

    this.cS.list().subscribe((data) => {
      this.view(data);
      this.dataSource = new MatTableDataSource(this.arrCom);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.view(data);
      this.dataSource = new MatTableDataSource(this.arrCom);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }

  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }

  view(data:any){
    if(this.role == 'ABOGADO'){
      for(let i=0;i<data.length;i++){
        if(data[i].lawyer.username==this.ls.showUsername()){
          this.arrCom.push(data[i])
        }
      };
    }
    else{
      this.arrCom = data;
    }
  }
}

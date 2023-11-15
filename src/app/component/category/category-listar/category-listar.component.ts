import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-category-listar',
  templateUrl: './category-listar.component.html',
  styleUrls: ['./category-listar.component.css'],
})
export class CategoryListarComponent implements OnInit {
  role: string = '';
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'categoria', 'accion01'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CategoryService, private ls: LoginService) {}
  ngOnInit(): void {
    this.role = this.ls.showRole();
    this.cS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
}

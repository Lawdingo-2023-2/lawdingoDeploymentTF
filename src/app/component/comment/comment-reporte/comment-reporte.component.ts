import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommentByLawyerDTO } from 'src/app/model/CommentByLawyerDTO';
import { Users } from 'src/app/model/users';
import { CommentService } from 'src/app/service/comment.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-comment-reporte',
  templateUrl: './comment-reporte.component.html',
  styleUrls: ['./comment-reporte.component.css'],
})
export class CommentReporteComponent implements OnInit {
  dataSource: MatTableDataSource<CommentByLawyerDTO> =
    new MatTableDataSource<CommentByLawyerDTO>();
  mensaje: string = 'Si luego de presionar el boton Buscar no se muestran comentarios, el abogado no tiene comentarios registrados';
  form: FormGroup = new FormGroup({});
  idAbogadoSeleccionado: number = 0;
  listaComentarios: CommentByLawyerDTO[] = [];
  listaAbogados: Users[] = [];
  displayedColumns: string[] = ['cliente', 'descripcion', 'puntos'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cS: CommentService,
    private lawS: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lawyer: ['', Validators.required],
    });

    this.lawS.list().subscribe((data) => {
      this.listaAbogados = data.filter((obj) => {
        return obj.lawyer == true;
      });
    });
  }

  buscar() {
    if (this.form.valid) {
      this.mensaje = '';
      this.idAbogadoSeleccionado = this.form.value.lawyer;
      this.cS.getcomments(this.idAbogadoSeleccionado).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.listaComentarios = data;
        this.dataSource.paginator = this.paginator;
      });
    }

  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommentByLawyerDTO } from 'src/app/model/CommentByLawyerDTO';
import { Users } from 'src/app/model/users';

@Component({
  selector: 'app-comment-reporte',
  templateUrl: './comment-reporte.component.html',
  styleUrls: ['./comment-reporte.component.css'],
})
export class CommentReporteComponent implements OnInit {
  dataSource: MatTableDataSource<CommentByLawyerDTO> = new MatTableDataSource<CommentByLawyerDTO>();

  form: FormGroup = new FormGroup({});
  idAbogadoSeleccionado: number = 0;
  listaUsuarios: Users[] = [];
  listaAbogados: Users[] = [];

  displayedColumns: string[] = ['cliente', 'descripcion', 'puntos'];

  ngOnInit(): void {
      
  }


  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Consultation } from 'src/app/model/consultation';
import { ConsultationService } from 'src/app/service/consultation.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';
import { Category } from 'src/app/model/category';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-consultation-creaedita',
  templateUrl: './consultation-creaedita.component.html',
  styleUrls: ['./consultation-creaedita.component.css'],
})
export class ConsultationCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  consulta: Consultation = new Consultation();
  maxFecha: Date = moment().add(-1, 'days').toDate();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  listaCategorias: Category[] = [];
  idCategoriaSeleccionada: number = 0;

  listaClientes: Users[] = [];
  idUsuarioSeleccionado: number = 0;

  listaAbogados: Users[] = [];
  idAbogadoSeleccionado: number = 0;

  constructor(
    private cS: ConsultationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

    private uS: UsersService,
    private caS: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idConsultation: [''],
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      cliente: ['', Validators.required],
      abogado: ['', Validators.required],
      categoria: ['', Validators.required],
    });
    ///USERS
    this.uS.list().subscribe((data) => {
      this.listaClientes = data.filter((User) => User.lawyer == false);
      this.listaAbogados = data.filter((User) => User.lawyer == true);
    });
    ///CATEGORIA
    this.caS.list().subscribe((data) => {
      this.listaCategorias = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.consulta.idConsultation = this.form.value.idConsultation;
      this.consulta.title = this.form.value.title;
      this.consulta.date = this.form.value.date;
      this.consulta.description = this.form.value.description;
      this.consulta.client.idUser = this.form.value.cliente;
      this.consulta.lawyer.idUser = this.form.value.abogado;
      this.consulta.categories.idCategory = this.form.value.categoria;

      if (this.edicion) {
        this.cS.update(this.consulta).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.consulta).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/consultations']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idConsultation: new FormControl(data.idConsultation),
          title: new FormControl(data.title),
          date: new FormControl(data.date),
          description: new FormControl(data.description),
          cliente: new FormControl(data.client.idUser),
          abogado: new FormControl(data.lawyer.idUser),
          categoria: new FormControl(data.categories.idCategory),
        });
      });
    }
  }
}

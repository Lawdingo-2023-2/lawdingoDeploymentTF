import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Court } from 'src/app/model/court';
import { Proceeding } from 'src/app/model/proceeding';
import { Users } from 'src/app/model/users';
import { CourtService } from 'src/app/service/court.service';
import { ProceedingService } from 'src/app/service/proceeding.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-proceeding-creaedita',
  templateUrl: './proceeding-creaedita.component.html',
  styleUrls: ['./proceeding-creaedita.component.css'],
})
export class ProceedingCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  expediente: Proceeding = new Proceeding();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  estados: { value: string; viewValue: string }[] = [
    { value: 'O', viewValue: 'Opened' },
    { value: 'C', viewValue: 'Closed' },
    { value: 'P', viewValue: 'Pending' },
  ];
  listaUsuarios: Users[] = [];
  listaJuzgados: Court[] = [];
  idJuzgadoSeleccionado: number = 0;
  listaClientes: Users[] = [];
  idClienteSeleccionado: number = 0;
  listaAbogados: Users[] = [];
  idAbogadoSeleccionado: number = 0;

  constructor(
    private pS: ProceedingService,
    private crtS: CourtService,
    private cltS: UsersService,
    private lawS: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idProceeding: [''],
      name: ['', Validators.required],
      state: ['', Validators.required],
      court: ['', Validators.required],
      client: ['', Validators.required],
      lawyer: ['', Validators.required],
    });
    this.crtS.list().subscribe((data) => {
      this.listaJuzgados = data;
    });
    this.cltS.list().subscribe((data) => {
      this.listaUsuarios = data;

      this.listaClientes = this.listaUsuarios.filter((obj) => {
        return obj.lawyer == false;
      });
    });
    this.lawS.list().subscribe((data) => {
      this.listaUsuarios = data;

      this.listaAbogados = this.listaUsuarios.filter((obj) => {
        return obj.lawyer == true;
      });
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.expediente.idProceeding = this.form.value.idProceeding;
      this.expediente.name = this.form.value.name;
      this.expediente.state = this.form.value.state;
      this.expediente.court.idCourt = this.form.value.court;
      this.expediente.client.idUser = this.form.value.client;
      this.expediente.lawyer.idUser = this.form.value.lawyer;

      if (this.edicion) {
        this.pS.update(this.expediente).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.expediente).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/proceedings']);
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
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idProceeding: new FormControl(data.idProceeding),
          name: new FormControl(data.name),
          state: new FormControl(data.state),
          court: new FormControl(data.court.idCourt),
          client: new FormControl(data.client.idUser),
          lawyer: new FormControl(data.lawyer.idUser),
        });
      });
    }
  }
}

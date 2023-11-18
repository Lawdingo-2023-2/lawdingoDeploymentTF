import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Certification } from 'src/app/model/certification';
import { Users } from 'src/app/model/users';
import { CertificationService } from 'src/app/service/certification.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-certification-creaedita',
  templateUrl: './certification-creaedita.component.html',
  styleUrls: ['./certification-creaedita.component.css']
})
export class CertificationCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup ({});
  certification: Certification = new Certification();
  mensaje: string = "";
  edicion: boolean = false;
  id: number = 0;

  listaUsuarios: Users[] = [];
  listaClientes: Users[] = [];
  idUsuarioSeleccionado:number = 0

  constructor(
    private cS:CertificationService,
    private uS:UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ){}

    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
      this.form = this.formBuilder.group({
        idCertification: [''],
        title: ['', Validators.required],
        client: ['', Validators.required],
      });

      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;

        this.listaClientes = this.listaUsuarios.filter((obj) => {
          return obj.lawyer == true;
        });
      });
    }
    aceptar(): void {
      if (this.form.valid) {
        this.certification.idCertification = this.form.value.idProceeding;
        this.certification.title = this.form.value.name;
        this.certification.client.idUser = this.form.value.client;

        if (this.edicion) {
          this.cS.update(this.certification).subscribe(() => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
          });
        } else {
          this.cS.insert(this.certification).subscribe((data) => {
            this.cS.list().subscribe((data) => {
              this.cS.setList(data);
            });
          });
        }
        this.router.navigate(['/components/certification']);
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
            idCertification: new FormControl(data.idCertification),
            title: new FormControl(data.title),
            client: new FormControl(data.client.idUser),
          });
        });
      }
    }
}

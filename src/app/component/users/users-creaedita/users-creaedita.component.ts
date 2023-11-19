import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { Users } from 'src/app/model/users';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-users-creaedita',
  templateUrl: './users-creaedita.component.html',
  styleUrls: ['./users-creaedita.component.css']
})
export class UsersCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Users = new Users();
  mensaje: string = '';
  maxFecha: Date = moment().add( 'days').toDate();

  birthDay = new FormControl(new Date());
  
  id: number = 0;
  edicion: boolean = false;



  /*booleanOptions: BooleanOption[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },
  ];*/
  booleanOptions:{value: boolean; viewValue: string}[] = [

    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' },

  ];


  

  constructor(
    private uS: UsersService,
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
      idUser: ['',],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,, this.gmailValidator]],
      password: ['', Validators.required],
      phone_num: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      birthDay: ['', Validators.required],
      lawyer: ['', Validators.required],
      username: ['', Validators.required],

      

    });


  }
  aceptar(): void {
    if (this.form.valid) {

      this.usuario.idUser = this.form.value.idUser;
      this.usuario.name = this.form.value.name;
      this.usuario.email = this.form.value.email;
      this.usuario.password = this.form.value.password;
      this.usuario.phone_num = this.form.value.phone_num;
      this.usuario.dni = this.form.value.dni;
      this.usuario.birthDay = this.form.value.birthDay;
      this.usuario.username = this.form.value.username;
      this.usuario.lawyer= this.form.value.lawyer;


      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(() => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        },
        );
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/users']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  gmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value as string;
    if (email && !email.toLowerCase().endsWith('@gmail.com')) {
      return { 'invalidGmail': true };
    }
    return null;
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
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new  FormGroup({
          idUser: new FormControl(data.idUser),
          name: new FormControl(data.name),
          email: new FormControl(data.email),
          password:new FormControl(data.password),
         lawyer:new FormControl(data.lawyer),
          phone_num:new FormControl(data.phone_num),
          dni:new FormControl(data.dni),
          birthDay: new FormControl(data.birthDay),
          username:new FormControl(data.username)
        });
      });
    }
  }
}

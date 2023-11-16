import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  Subscription } from 'src/app/model/subscription';
import { SubscriptionService } from 'src/app/service/subscription.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-subscription-creaedita',
  templateUrl: './subscription-creaedita.component.html',
  styleUrls: ['./subscription-creaedita.component.css']
})
export class SubscriptionCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  s: Subscription = new Subscription();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  tipos: { value: string, viewValue: string }[] = [{ value: 'Free', viewValue: 'Free'},
  { value: 'Premium', viewValue: 'Premium' },];
 
  listaUsuarios: Users[] = [];
  idUsuarioSeleccionado:number=0
  opcionSeleccionada: string | undefined;


  constructor(
    private sS: SubscriptionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsersService,
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();

    });
    this.form = this.formBuilder.group({
      idSubscription: ['',],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      sub_start_date: ['', Validators.required],
      users: ['', Validators.required],


    });
    ///USERS
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
   
  }
  calcularMonto(): string {
    const tipoSuscripcion = this.form.get('name')?.value;
  
    // Lógica para calcular el monto según la opción seleccionada
    if (tipoSuscripcion === 'Free') {
      return 'S/0.00';
    } else if (tipoSuscripcion === 'Premium') {
      return 'S10.00';
    } else {
      return ''; // Manejar otros casos si es necesario
    }
  }
  
    

  aceptar(): void {
    if (this.form.valid) {
      this.s.idSubscription = this.form.value.idSubscription;
      this.s.name = this.form.value.name;
      this.s.amount = this.form.value.amount;
      this.s.sub_start_date = this.form.value.sub_start_date;
      this.s.users.idUser = this.form.value.users;


      if (this.edicion) {
        this.sS.update(this.s).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.s).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/subscriptions']);

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
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSubscription: new FormControl(data.idSubscription),
          name: new FormControl(data.name),
          amount: new FormControl(data.amount),
          sub_start_date: new FormControl(data.sub_start_date),
          users: new FormControl(data.users.idUser),

        });
      });
    }
  }
}
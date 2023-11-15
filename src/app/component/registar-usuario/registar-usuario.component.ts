import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { UsersService } from 'src/app/service/users.service';
import { Router} from '@angular/router'
import { Role } from 'src/app/model/role';
import { RoleService } from 'src/app/service/role.service';
@Component({
  selector: 'app-registar-usuario',
  templateUrl: './registar-usuario.component.html',
  styleUrls: ['./registar-usuario.component.css']
})
export class RegistarUsuarioComponent implements OnInit {
  r: Role = new Role();
  form: FormGroup = new FormGroup({});
  u: Users = new Users();
  mensaje: string = "";
  username:String="";
  rol:String="";
  id:number=0;
  cont:number=0;
  form2: FormGroup = new FormGroup({});

  constructor(
    private uS: UsersService,
    private rS: RoleService,
    private fb: FormBuilder,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      dni: new FormControl(),
      usuario: new FormControl(),
      nombre: new FormControl(),
      correo: new FormControl(),
      contraseña: new FormControl(),
      telefono:new FormControl(),
      tipo: new FormControl(),
    });
    this.form2=new FormGroup({
      rol:new FormControl(),
      usuario_id:new FormControl(),
    })
  }

  registrar(): void {
    this.u.idUser= this.form.value['id'];
    this.u.dni= this.form.value['dni'];
    this.u.username= this.form.value['usuario'];
    this.u.name= this.form.value['nombre'];
    this.u.email= this.form.value['correo'];
    this.u.password= this.form.value['contraseña'];
    this.u.phone_num= this.form.value['telefono'];
    this.u.rol= this.form.value['tipo'];
    if (this.form.value['dni'] && this.form.value['dni'].length > 0 &&
    this.form.value['usuario'] && this.form.value['usuario'].length > 0 &&
    this.form.value['nombre'] && this.form.value['nombre'].length > 0 &&
    this.form.value['correo'] && this.form.value['correo'].length > 0 &&
    this.form.value['contraseña'] && this.form.value['contraseña'].length > 0 &&
    this.form.value['telefono'] && this.form.value['telefono'].length > 0 &&
    this.form.value['tipo'] && this.form.value['tipo'].length > 0 ) {
      this.registrarusuario();
      this.cont=1;
      } else {
         alert("Complete los campos requeridos ¬¬");
        }
  }
  registrarusuario():void{
    this.uS.insert(this.u).subscribe(data => {
      this.uS.list().subscribe(data => {
       this.uS.setList(data);
      });
    });
  }
  registrarrol():void{
    this.username=this.u.username;
    this.uS.listUsername(this.u.username).subscribe(data => {
      this.rol=data.rol;
      this.id=data.idUser;
      console.log(this.id);
      this.r.rol=this.rol;
      this.r.user.idUser=this.id;
      console.log(this.id);
      if(this.id>0){
        console.log(this.id);
        this.rS.insert(this.r).subscribe(data=> {
        this.rS.list().subscribe(data=>{
        this.rS.setList(data);
      })
    })
    console.log(this.rol)
    
    if(this.rol=="ABOGADO"){
      this.router.navigate(['login',this.u.username]);
    }
    if(this.rol=="CLIENTE"){
      this.router.navigate(['login',this.u.username]);
    }
      }
    })
  }
}

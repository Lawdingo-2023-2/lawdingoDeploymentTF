import { Role } from "./role";

export class Users {
  //ATRIBUTOS
  idUser: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  phone_num: number = 0;
  dni: number = 0;
  birthDay: Date = new Date(Date.now());
  lawyer: boolean = true;
  username: string = '';
  enabled: boolean = true;
  rol:string =""
}

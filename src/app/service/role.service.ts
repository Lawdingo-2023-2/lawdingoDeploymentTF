import { Injectable } from '@angular/core';

import { enviroment } from 'src/enviroments/enviroment';
//se agrega los imports para actualizar la variables
import { Subject } from 'rxjs';
import { Role } from '../model/role';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

//declaracion de una constante
const base_url = enviroment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = `${base_url}/roles`;
  private listaCambio = new Subject<Role[]>(); //trae la data de manera odenada

  constructor(private http: HttpClient) {}

  //metodos
  //listar
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Role[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO GET (HTTTP)
  }

  listR() {

    return this.http.get<Role[]>(this.url); //METODO GET (HTTTP)
  }

  //insertar
  insert(r: Role) {
    //alienado al backend
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, r, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO PSOT(HTTP)
  }
  insertR(ro: Role) {
    //alienado al backend
  
    return this.http.post(this.url, ro); //METODO PSOT(HTTP)
  }

  //llenar variable lista cambio
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
    //nos informa de todo lo nuevo que hay
    // a pesar de no estar conectados
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Role>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(r:Role) { 
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, r, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}

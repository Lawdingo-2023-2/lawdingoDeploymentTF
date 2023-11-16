import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import {  Subject } from 'rxjs';
import { Users } from '../model/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  
  private url = `${base_url}/users`;
  private listaCambio = new Subject<Users[]>();

  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Users[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(p: Users) {

    let token = sessionStorage.getItem('token');

    return this.http.post(`${this.url}/save`, p,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  //////ROL
  insertR(h: Users) {

    return this.http.post(`${this.url}/save`,h);
  }
  listR() {

    return this.http.get<Users[]>(this.url);
  }


  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Users>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(c: Users) {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, c, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  //AGREGADO - PROBANDO REGISTRAR
  listUsername(name: String) {
    return this.http.get<Users>(`${this.url}/username/${name}`)
  }
}

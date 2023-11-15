import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { Proceeding } from '../model/proceeding';
import { Subject, Observable } from 'rxjs';
import { ProceedingSummaryDTO } from '../model/ProceedingSummaryDTO';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class ProceedingService {
  //declaracion de varibales privadas
  //acceso al controlador
  private url = `${base_url}/proceedings`;
  private listaCambio = new Subject<Proceeding[]>(); //trae la data de manera odenada

  constructor(private http: HttpClient) {}

  //metodos
  //listar
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Proceeding[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO GET (HTTTP)
  }
  //insertar
  insert(pro: Proceeding) {
    //alienado al backend
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, pro, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO PSOT(HTTP)
  }

  //llenar variable lista cambio
  setList(listaNueva: Proceeding[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
    //nos informa de todo lo nuevo que hay
    // a pesar de no estar conectados
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Proceeding>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(p: Proceeding) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, p, {
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
  getdocs(): Observable<ProceedingSummaryDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<ProceedingSummaryDTO[]>(`${this.url}/resumenexpediente`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}

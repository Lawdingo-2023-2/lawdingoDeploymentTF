import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

//se agrega los imports para actualizar la variables
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { District } from '../model/district';
import { ProceedingByDistrictDTO } from '../model/ProceedingByDistrictDTO';

//declaracion de una constante
const base_url = enviroment.base;

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
//declaracion de varibales privadas

  //acceso al controlador
  private url = `${base_url}/districts`;
  private listaCambio = new Subject<District[]>(); //trae la data de manera odenada

  constructor(private http: HttpClient) {}

  //metodos
  //listar
  list() {
    //return this.http.get<Documentation[]>(this.url); //METODO GET (HTTTP)
    let token = sessionStorage.getItem('token');

    return this.http.get<District[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO GET (HTTTP)
  }
  //insertar
  insert(d: District) {
    //alienado al backend
    //return this.http.post(this.url, doc); //METODO PSOT(HTTP)
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, d, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO PSOT(HTTP)
  }

  //llenar variable lista cambio
  setList(listaNueva: District[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
    //nos informa de todo lo nuevo que hay
    // a pesar de no estar conectados
  }
  listId(id: number) {
    //return this.http.get<Documentation>(`${this.url}/${id}`);
    let token = sessionStorage.getItem('token');

    return this.http.get<District>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(d:District) {
    //return this.http.put(this.url, d);
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, d, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    //return this.http.delete(`${this.url}/${id}`);
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getdocs(): Observable<ProceedingByDistrictDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<ProceedingByDistrictDTO[]>(`${this.url}/cantidadprocedimientospordistrito`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
}
}

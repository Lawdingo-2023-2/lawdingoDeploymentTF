import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

//se agrega los imports para actualizar la variables
import { Observable, Subject } from 'rxjs';
import { Category } from '../model/category';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ConsultationByCategoryDTO } from '../model/ConsultationByCategoryDTO';

//declaracion de una constante
const base_url = enviroment.base;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //declaracion de varibales privadas

  //acceso al controlador
  private url = `${base_url}/categories`;
  private listaCambio = new Subject<Category[]>(); //trae la data de manera odenada

  constructor(private http: HttpClient) {}

  //metodos
  //listar
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Category[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO GET (HTTTP)
  }
  //insertar
  insert(c: Category) {
    //alienado al backend
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, c,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  } //METODO PSOT(HTTP)
  

  //llenar variable lista cambio
  setList(listaNueva: Category[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
    //nos informa de todo lo nuevo que hay
    // a pesar de no estar conectados
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Category>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(c:Category) { 
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, c, {
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
  getdocs(): Observable<ConsultationByCategoryDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<ConsultationByCategoryDTO[]>(`${this.url}/cantidadconsultasporcategoria`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}

import { UsersBySubscriptionDTO } from './../model/UsersBySubscription';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

//se agrega los imports para actualizar la variables
import{ Observable, Subject} from 'rxjs'
import { Subscription } from '../model/subscription';
import{HttpClient, HttpHeaders } from '@angular/common/http'

//declaracion de una constante
const base_url=enviroment.base
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private url=`${base_url}/subscription`;
  private listaCambio=new Subject<Subscription[]>(); //trae la data de manera odenada

  constructor(private http:HttpClient) { }

    //metodos

  //listar
  list(){
    let token = sessionStorage.getItem('token');
    return this.http.get<Subscription[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO GET (HTTTP)
  }
  
  //insertar
  insert(s: Subscription){
    //alineado al backend
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, s,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  } //METODO PSOT(HTTP)

   //llenar variable lista cambio
  setList(listaNueva: Subscription[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
    //nos informa de todo lo nuevo que hay
    // a pesar de no estar conectados
  }


  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Subscription>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(s: Subscription) { 
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, s, {
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
  getdocs(): Observable<UsersBySubscriptionDTO[]>{
    let token = sessionStorage.getItem('token');
    return this.http.get<UsersBySubscriptionDTO[]>(`${this.url}/cantidausuarioporsuscripcion`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
}
}
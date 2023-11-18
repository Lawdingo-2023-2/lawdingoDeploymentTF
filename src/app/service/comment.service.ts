import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Comment } from '../model/comment';
import { CommentByLawyerDTO } from '../model/CommentByLawyerDTO';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = `${base_url}/comments`;
  private listaCambio = new Subject<Comment[]>(); //trae la data de manera odenada

  constructor(private http: HttpClient) {}
  //metodos
  //listar
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Comment[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO GET (HTTTP)
  }
  //insertar
  insert(com: Comment) {
    //alienado al backend
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, com, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); //METODO PSOT(HTTP)
  }

  //llenar variable lista cambio
  setList(listaNueva: Comment[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
    //nos informa de todo lo nuevo que hay
    // a pesar de no estar conectados
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Comment>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(c: Comment) {
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
  getcomments(idlawyer: number): Observable<CommentByLawyerDTO[]>{
    let token = sessionStorage.getItem('token');
    
    return this.http.get<CommentByLawyerDTO[]>(`${this.url}/listCommentByLawyer?idLaw=${idlawyer}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }
}

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { JwtRequest } from '../model/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: JwtRequest) {
    return this.http.post("https://lawdingodeployment2023.onrender.com/authenticate", request);
  }
  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;

  }
  showRole(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  showUsername(){
    let username = sessionStorage.getItem("username")
    if (!username) {
      // Manejar el caso en el que el token es nulo.
      return "none"; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    return username;
  }
}

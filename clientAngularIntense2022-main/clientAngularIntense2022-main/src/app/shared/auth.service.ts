import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  url = "http://localhost:8010/api/login";
  logIn(username: String, password: String) {
    // typiquement, on devrait prendre en paramètres
    // login et password, vérifier qu'ils sont valides
    // en utilisant un web service en ligne (soit via une BD)
    // soit via oAuth, etc.

    // Nous pour le moment, on simule...
    this.http.post<any>(this.url, {username: username, password: password}).subscribe({
        next: data => {
            console.log("connected");
            this.loggedIn = true;
        },
        error: error => {
            console.log("not connected wrong man");
        }
    })
    

  }

  logOut() {
    // appelée typiquement par le bouton de deconnexion

    this.loggedIn = false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
  }
  constructor(private http:HttpClient) { }
}

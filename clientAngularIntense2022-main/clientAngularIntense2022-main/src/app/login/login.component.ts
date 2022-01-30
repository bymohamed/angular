import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngUsername = "";
  ngPassword = "";

  constructor(private _authServe: AuthService, private router: Router) { }

  Login() {
    this._authServe.logIn(this.ngUsername, this.ngPassword)
    console.log("connexion from login component")
    setTimeout(() => {
      this.router.navigate(['/home']);
    },
      1000);
  }

  ngOnInit(): void {
  }

}

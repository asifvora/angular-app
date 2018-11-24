import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appTitle: string = 'Angular App';
  isAuth: boolean = false;

  constructor(
    public auth: AuthService,
    public localStorageService: LocalStorageService,
    public router: Router
  ) { }

  ngOnInit() {
    this.isAuth = this.auth.isAuthenticated();
  }

  isAuthCheck() {
    this.isAuth = this.auth.isAuthenticated();
    return this.isAuth;
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  isAdmin() {
    return this.auth.isAdmin;
  }

}

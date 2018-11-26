import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import * as moduleTypes from '../../models/moduleTypes';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  appTitle: string = 'Angular App';
  currentUser: any;
  adminModule = moduleTypes.ADMIN_MODULE;

  constructor(
    public auth: AuthService,
    public localStorageService: LocalStorageService,
    public router: Router,
  ) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated;
  }

  isHasRole(moduleType) {
    return this.auth.isHasRole(moduleType);
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import { ModuleUser } from './../../models/moduleUser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  appTitle: string = 'Angular App';
  currentUser: any;

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
    if (this.isAuthenticated) {
      let role = this.currentUser && this.currentUser.role ? this.currentUser.role : null;
      switch (moduleType) {
        case 'AdminModule':
          return ModuleUser.AdminModule.includes(role) ? true : false;
        default:
          return false;
      }
    } else {
      return false;
    }
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

}

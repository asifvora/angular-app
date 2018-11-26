import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from '../http/api.service';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public routeData: any;

  constructor(
    private API: APIService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.localStorageService.get('user'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
      }
    });
  }

  public get isAuthenticated(): boolean {
    const token = this.localStorageService.get('token');
    return token ? true : false;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get isHasRole(): boolean {
    let user = this.currentUserValue;
    if (this.isAuthenticated) {
      if (user && user.role && this.routeData && this.routeData.roles && this.routeData.roles.indexOf(user.role) === -1) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  currentUserSubjectNext(value): any {
    return this.currentUserSubject.next(value);
  }

  login(data) {
    return this.API.post(`login`, data);
  }

  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clear();
    this.currentUserSubject.next(null);
  }

}

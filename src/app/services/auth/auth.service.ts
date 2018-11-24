import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from '../http/api.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private API: APIService,
    private localStorageService: LocalStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.localStorageService.get('user'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    const token = this.localStorageService.get('token');
    // true or false
    return token ? true : false;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    let user = this.currentUserSubject.value;
    return user && user.role === Role.Admin ? true : false;
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

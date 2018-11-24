import { Injectable } from '@angular/core';
import { APIService } from '../http/api.service';
import { LocalStorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private API: APIService,
    private localStorageService: LocalStorageService
  ) { }

  public isAuthenticated(): boolean {
    const token = this.localStorageService.get('token');
    // true or false
    console.log('token)', token)
    return token ? true : false;
  }

  login(data) {
    return this.API.post(`login`, data);
  }

}

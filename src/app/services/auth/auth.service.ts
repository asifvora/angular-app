import { Injectable } from '@angular/core';
import { APIService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private API: APIService) { }

  login(data) {
    return this.API.post(`login`, data);
  }
}

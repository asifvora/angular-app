import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { environment as production } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseURL = environment.API_END_URL || production.API_END_URL;
  constructor(private http: HttpClient) { }

  get(path) {
    return this.http.get(`${this.baseURL}${path}`);
  }

  post(path, data) {
    return this.http.post(`${this.baseURL}${path}`, JSON.stringify(data));
  }

  put(path) {
    return this.http.put(`${this.baseURL}${path}`, JSON.stringify({}));
  }

  delete(path) {
    return this.http.delete(`${this.baseURL}${path}`);
  }

}

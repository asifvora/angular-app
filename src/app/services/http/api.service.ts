import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseURL = environment.baseURL;

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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseURL = `https://reqres.in/api/users`;

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.baseURL);
  }

  post() {
    return this.http.post(this.baseURL, {});
  }

  put() {
    return this.http.put(this.baseURL, {});
  }

  delete() {
    return this.http.delete(this.baseURL);
  }
}

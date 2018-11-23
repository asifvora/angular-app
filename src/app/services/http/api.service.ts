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
    return this.http.post(this.baseURL, JSON.stringify({}));
  }

  put() {
    return this.http.put(this.baseURL, JSON.stringify({}));
  }

  delete() {
    return this.http.delete(this.baseURL);
  }

}

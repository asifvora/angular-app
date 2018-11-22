import { Component, OnInit } from '@angular/core';
import { APIService } from './../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: object;

  constructor(private API: APIService) { }

  ngOnInit() {
    this.API.get().subscribe(res => {
      this.users = res;
    });
  }

}

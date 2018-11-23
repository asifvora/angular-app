import { Component, OnInit } from '@angular/core';
import { APIService } from './../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: object;
  isLoading: boolean = false;

  constructor(private API: APIService) { }

  ngOnInit() {
    this.isHandleLoading(true);
    this.API.get().subscribe(
      response => {
        this.users = response;
        this.isHandleLoading(false);
      },
      (error: Response) => {
        this.isHandleLoading(false);
        console.log('error : ', error)
      });
  }

  isHandleLoading(status) {
    return this.isLoading = status;
  }

}

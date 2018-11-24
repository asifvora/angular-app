import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  users: object;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    public auth: AuthService,
  ) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.isHandleLoading(true);
    this.userService.getUsers().subscribe(
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

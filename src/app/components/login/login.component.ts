import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/localstorage/localstorage.service'
import { Router } from '@angular/router';
import { Role } from '../../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  fail = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private localStorageService: LocalStorageService,
    public router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['asif@gmail.com', Validators.compose([Validators.required, this.validationService.emailValidator])],
      password: ['123456', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let token = "W&NDw9zAdarDER7R7";
    let data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
      role: Role.User
    }

    this.authService.login(data).subscribe(
      response => {
        console.log('response : ', response)
      },
      (error: Response) => {
        this.fail = true;
        this.localStorageService.set('token', token);
        this.localStorageService.set('user', data);
        this.authService.currentUserSubjectNext(data);
        this.router.navigate(['/']);
        console.log('error : ', error)
      });
  }

}

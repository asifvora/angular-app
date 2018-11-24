import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { ValidationService } from './../../services/validation/validation.service';
import { LocalStorageService } from '../../services/localstorage/localstorage.service'

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
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['asif@gmail.com', Validators.compose([Validators.required, validationService.emailValidator])],
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
    }
    this.authService.login(data).subscribe(
      response => {
        console.log('response : ', response)
      },
      (error: Response) => {
        this.fail = true;
        this.localStorageService.set('token', token);
        this.localStorageService.set('user', data);
        console.log('error : ', error)
      });
  }

}

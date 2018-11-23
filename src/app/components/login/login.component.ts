import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth/auth.service';
import { ValidationService } from './../../services/validation/validation.service';

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
    private validationService: ValidationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, validationService.emailValidator])],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
  console.log('loginForm.controls.email.errors',this.loginForm.controls.email.errors)
    if (this.loginForm.invalid) {
      return;
    }


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
        console.log('error : ', error)
      });
  }

}

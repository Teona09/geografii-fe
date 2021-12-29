import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder
) {}

  ngOnInit(): void {this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
}

  login() {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    this.loginForm.reset();
    }
}

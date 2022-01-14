import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notifyService : NotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      (data) => {
        console.log(data);
        if(data.status == 201){
            this.router.navigate(['/login']);
            this.registerForm.reset();
        }
        else{
          this.notifyService.showError("Emailul este deja folosit", "")
        }
      },
      (err) => {
        this.notifyService.showError("Emailul este deja folosit", "");
      }
    );
    
  }

  passwordMatchValidator(control: AbstractControl): void {
    if (control.get('password').value === control.get('repeatPassword').value) {
      if (control.get('repeatPassword').hasError('mismatch'))
        control.get('repeatPassword').setErrors(null);
    }
    else {
      control.get('repeatPassword').setErrors({ mismatch: true });
    }
  }
}

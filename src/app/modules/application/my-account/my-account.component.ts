import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { switchMap, take } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  beforeUser: User;
  user: User;
  defaultUser: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    usablePoints: 0,
    roleModel: 'basic',
    levelModels: [],
  };
  form = {} as FormGroup;
  resetPassForm = {} as FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private modalService: NgbModal,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm(this.defaultUser);
    this.userService
      .getUser(this.tokenStorage.getUser())
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.user = data;
          this.initializeForm(data);
        }
      });
    this.resetPassForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  resetPasswordForm() {
    this.resetPassForm.reset();
  }

  initializeForm(user: User) {
    this.form = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, Validators.required],
      usablePoints: [user.usablePoints],
    });
  }

  save() {
    this.beforeUser = this.user;
    this.user = { ...this.user, ...this.form.value };
    this.userService.update(this.user).subscribe((data) => {
      if (data) {
        this.user = data;
        this.initializeForm(data);
      } else {
        this.notifyService.showError('Emailul este deja folosit', '');
        this.initializeForm(this.beforeUser);
      }
    });
  }

  delete() {
    this.userService
      .delete(this.user.userId)
      .pipe(take(1))
      .subscribe((data) => {
        this.modalService.dismissAll();
        this.router.navigate(['/login']);
        this.tokenStorage.signOut();
      });
  }

  submit() {
    this.userService
      .resetPassword(this.user.userId, this.resetPassForm.get('password').value)
      .pipe(
        take(1),
        switchMap(() => {
          return this.userService.getUser(this.tokenStorage.getUser());
        })
      )
      .subscribe((data) => {
        this.user = data;
        this.initializeForm(data);
        this.resetPassForm.reset();
      });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  passwordMatchValidator(control: AbstractControl): void {
    if (control.get('password').value === control.get('repeatPassword').value) {
      if (control.get('repeatPassword').hasError('mismatch'))
        control.get('repeatPassword').setErrors(null);
    } else {
      control.get('repeatPassword').setErrors({ mismatch: true });
    }
  }
  openDeletePopUp(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'confirmModalLabel' });
  }
}

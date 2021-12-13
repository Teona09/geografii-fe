import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
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
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initializeForm(this.defaultUser);
    this.userService.getUser(this.tokenStorage.getUser()).subscribe((data) => {
      this.user = data;
      this.initializeForm(data);
    });
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
    this.user = { ...this.user, ...this.form.value };
    this.userService.update(this.user).subscribe((data) => {
      this.user = data;
      this.initializeForm(data);
    });
  }

  delete() {
    this.userService.delete(this.user.userId).subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }

  submit(){

  }

  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserLoginService } from '../../service/user-login.service';

import { User } from './user-login';

@Component({
  selector: 'adminLogin',
  templateUrl: './user-login.html',
  styleUrls: ['user-login.css']
})

export class LoginComponent implements OnInit {

  public userForm: FormGroup;
  public userInfo: User = new User();

  public currentClass: any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public userLoginService: UserLoginService
  ) { }


  public ngOnInit() {
    this.buildForm();
    console.log(this.userForm.value);
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      "userName": [
        this.userInfo.userName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32)
        ]
      ],
      "password": [
        this.userInfo.password,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]
      ]
    })
  }

  // 记得修改为result
  login() {
    console.log(this.userForm.value);
    var obj = JSON.stringify(this.userForm.value)
    this.userLoginService.login(obj).subscribe((result) => {
      console.log(result.code)
      if (result['code'] == 2) {
        this.router.navigateByUrl('workspace');
      } else if (result['code'] == 1) {
        console.log("密码错误")
      } else {
        console.log("用户不存在")
      }
    })

  }

  // 表单提示
  setformclass() {
    this.currentClass = {
      bbr: this.userForm.controls.userName.errors.minlength,
      bbr2: this.userForm.controls.userName.errors.required,
      bbg: this.userForm.controls.userName.valid
    }
  }



}
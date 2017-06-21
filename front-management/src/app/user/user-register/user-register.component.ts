import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { RegisterService } from '../../service/register.service';

import { User } from './model/user-register';

import { validateMobile } from './mobile.validator'

@Component({
  selector: 'about',
  templateUrl: './user-register.html',
  styleUrls: ['user-register.css']
})

export class UserRegisterComponent implements OnInit {

  public userForm: FormGroup;
  public userInfo: User = new User();

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public registerService:RegisterService
  ) { }


  public ngOnInit() {
    this.buildForm();
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
      ],
      "confirmPassword": [
        this.userInfo.confirmPassword,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]
      ],
      mobile: [
        this.userInfo.mobilePhone,
        [
          Validators.required,
          validateMobile
        ]
      ]

    })
  }

  UserRegister() {
    let userinfo = this.userForm.value;
    let model = {
      userName:userinfo.userName,
      password:userinfo.password,
      mobile:userinfo.mobile
    }
    let obj = JSON.stringify(model);
    console.log(model);
    this.registerService.postregisterData(obj).subscribe(ret =>{
      let data = ret
      console.log(data)
      if(data.code==1){
        this.router.navigateByUrl('/login')
      }else{
        alert("用户已存在")
      }
    })
  }





}

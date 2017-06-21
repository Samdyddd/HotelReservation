import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import localStorage from 'localStorage';

@Injectable()

export class UserLoginService {
  private loggedIn = false;

  public loginUrl = "http://localhost:9000/adminlogin"

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('currentUser');
  }

  // login(obj) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http
  //     .post(this.loginUrl, obj)
  //     .map(res => res.json())
  //     .map((res) => {
  //       if (res.success) {
  //         console.log(res.currentUser + "ddddddddd")
  //         localStorage.setItem('currentUser', res.currentUser);
  //         this.loggedIn = true;
  //       }
  //       return res.success;
  //     });
  // }

  login(obj) {
    return this.http.post(this.loginUrl, obj)
      .map(res => {
        var obj = res.json();
        if (obj.code == 2) {
          console.log("code==2")
          let userinfo = JSON.stringify(obj.currentUser)
          localStorage.setItem('currentUser', userinfo);
          this.loggedIn = true;
        }
        return obj;
      })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
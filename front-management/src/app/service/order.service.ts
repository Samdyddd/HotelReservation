import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class OrderService {
    public postorderUrl = "http://localhost:9000/postorder";

    public getnameorderUrl = "http://localhost:9000/postordername";

    public postStatusUrl = "http://localhost:9000/conststatus"


    constructor(public http: Http) { }

    public postOrderData(data) {
        return this.http.post(this.postorderUrl, data)
            .map(res => {
                return res.json()
            });
    }

    public getOrderData(userName) {
        return this.http.post(this.getnameorderUrl,userName)
            .map(res => {
                return res.json()
            });
    }

    public postStatus(obj) {
        return this.http.post(this.postStatusUrl, obj)
            .map(res => {
                return res.json()
            })
    }

}

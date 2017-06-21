import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class RegisterService {

    public postRegisterUrl = "http://localhost:9000/userregister";

    constructor(public http: Http) { }

    public postregisterData(data) {
        return this.http.post(this.postRegisterUrl, data)
            .map(res => {
                return res.json()
            });
    }



}
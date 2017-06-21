import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class EvaluateService {
    public postEvUrl = "http://localhost:9000/addev";

    constructor(public http: Http) { }

    public postEvData(data) {
        return this.http.post(this.postEvUrl, data)
            .map(res => {
                return res.json()
            });
    }



}

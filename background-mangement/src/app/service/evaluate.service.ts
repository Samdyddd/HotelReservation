import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class EvaluateService {

    public evgetUrl = 'http://localhost:9000/getev';

    constructor(private http: Http) { }

    public GetEvData() {
        return this.http.get(this.evgetUrl)
            .map(res => res.json());
    }


}
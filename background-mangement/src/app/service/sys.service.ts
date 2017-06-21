import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class SysService {

    public sysUrl = 'http://localhost:9000/orderinfo';
    public evinfoUrl = 'http://localhost:9000/evinfo';

    constructor(private http: Http) { }


    public GetSysData() {
        return this.http.get(this.sysUrl)
            .map(res => res.json());
    }

    public GetEvcount() {
        return this.http.get(this.evinfoUrl)
            .map(res => res.json());
    }



}
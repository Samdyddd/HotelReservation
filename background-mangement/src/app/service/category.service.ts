import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class CategoryService {

    public categoryUrl = 'http://localhost:9000/sendcategory';
    constructor(private http: Http) { }


    public GetTypeData() {
        return this.http.get(this.categoryUrl)
            .map(res => res.json());
    }


}
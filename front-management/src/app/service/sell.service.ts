import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class SellService {
    
    public goodsUrl = "http://localhost:9000/sendfoods";
    public headerUrl = "http://localhost:9000/sendhotel";

    constructor(public http: Http) { }

    public getFoods(): Observable<any> {
        return this.http.get(this.goodsUrl)
            .map(res => {
                return res.json()
            });
    }


    public getHotel(): Observable<any> {
        return this.http.get(this.headerUrl)
            .map(res => {
                return res.json()
            });
    }







}
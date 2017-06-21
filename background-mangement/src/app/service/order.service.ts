import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class OrderService {

    public orderdataUrl = "http://localhost:9000/getorder";
    public orderStatusUrl = "http://localhost:9000/modifystatus"
    constructor(private http: Http) { }


    public getOrderData() {
        return this.http.get(this.orderdataUrl)
            .map(res => res.json());
    }

    public postOrderStatus(id){
        return this.http.post(this.orderStatusUrl,id)
        .map(res => res.json())
    }


}
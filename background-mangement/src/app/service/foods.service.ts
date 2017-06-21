import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class FoodsService {

    public categoryUrl = 'http://localhost:9000/sendcategory';
    public foodsUrl = 'http://localhost:9000/addfoods';
    public goodsUrl = "http://localhost:9000/sendfoods";

    public deletefoodUrl = "http://localhost:9000/deletefood";

    public addfoodUrl = "http://localhost:9000/upload";

    public updateUrl = "http://localhost:9000/update";

    constructor(private http: Http) { }

    // 获取类型
    public GetTypeData() {
        return this.http.get(this.categoryUrl)
            .map(res => res.json());
    }
    // 获取
    public getFoods() {
        return this.http.get(this.goodsUrl)
            .map(res => {
                return res.json()
            });
    }
    //删除食物
    public deletefood(data) {
        return this.http.post(this.deletefoodUrl, data)
            .map(res => res.json());
    }

    // 增加商品
    public postFood(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.addfoodUrl, data)
            .map(res => res.json())
    }

    //更新商品
    public updateFood(data) {
        return this.http.post(this.updateUrl, data)
            .map(res => res.json());
    }


}
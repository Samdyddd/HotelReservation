import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../app.service'

@Component({
    selector: 'shopcart',
    templateUrl: './shopcart.html',
    styleUrls: ['shopcart.css']
})
export class ShopCartComponent implements OnInit {

    @Input() totalprice: any;

    public foodlist: any;
    public dis = false;

    constructor(public appState: AppState, public router: Router) {

    }

    public ngOnInit() {
        this.foodlist = this.appState.get("foodlist");
    }


    totalCount() {
        this.totalprice = 0;
        if (this.foodlist.foodlist != undefined || this.foodlist.foodlist != null) {
            this.foodlist.foodlist.forEach(element => {
                this.totalprice += Number(element.count * element.price)
            });
            console.log(this.totalprice)
        }

    }

    empty() {
        this.foodlist = '';
        this.totalprice = '';
    }

    showlist() {
        this.dis = !this.dis;
    }

    add(food) {
        food['count'] += 1;
        console.log(this.foodlist)
        this.totalCount();
    }
    reduce(food) {
        food['count'] -= 1;
        this.totalCount();
    }

    // 下单
    sendToOrder() {
        let orderfoods = [];
        this.foodlist.foodlist.forEach(element => {
            if (element.count && element.count > 0) {
                orderfoods.push(element);
            }
        })
        console.log(orderfoods)
        this.appState.set("foodlist", orderfoods);
        this.router.navigateByUrl("workspace/ratings");
    }




}

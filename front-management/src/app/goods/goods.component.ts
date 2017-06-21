import { Component, OnInit } from '@angular/core';
import { SellService } from '../service/sell.service';
import { AppState } from '../app.service';

declare var $: any;


@Component({
  selector: 'goods',
  styleUrls: ['goods.css'],
  templateUrl: './goods.html'
})
export class GoodsComponent implements OnInit {

  public goods: any;
  public selectfood: any;
  public dis = false;
  public totalprice: any;


  constructor(public sellservice: SellService, public appState: AppState) { this.getHeader(); }
  public ngOnInit() {

  }


  ondis() {
    console.log("ddddd")
  }

  selectfoods(food) {
    let foods = [];
    let tc = null;
    if (!food['count'] || food['count'] == 0) {
      food['count'] = 1;
    }
    this.goods.forEach(element => {
      element.foods.forEach((item) => {
        if (item.count && item.count > 0) {
          foods.push(item);
        }
      })
    });

    this.goods.forEach(element => {
      element.foods.forEach((item) => {
        if (item.count && item.count > 0) {
          tc += Number(item.price);
        }
      })
    });

    this.totalprice = tc;
    this.appState.set("foodlist", foods)
  }

  getHeader() {
    this.sellservice.getFoods()
      .subscribe(
      data => {
        this.goods = data
      });
  }
}

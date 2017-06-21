import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'order',
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})

export class OrderComponent implements OnInit {


  public orderData: any;
  public orderstatus = 0;
  public orderstatus2 = 1;
  public orderdataUrl = "http://localhost:9000/getorder";
  public ref;
  constructor(private orderService: OrderService,
    public http: Http,
    ref: ChangeDetectorRef) {

    this.orderService.getOrderData().subscribe(ret => {
      this.orderData = ret
    })
  }

  public ngOnInit() {

    var that = this;
    var orderservice = this.orderService;
    var orderinfo = '';
    setInterval(function () {
      orderservice.getOrderData().subscribe(ret => {
        that.orderData = ret
      })
    }, 2000);

    this.orderData = orderinfo;
    this.num(this.num(this.orderData));
  }



  status(_id) {
    this.orderService.postOrderStatus(_id).subscribe(res => {
      let orderstatus = res
      if (orderstatus.code == 1) {
        this.orderstatus = 1;
        this.orderstatus2 = 0;
      } else {
        console.log("接单不成功")
      }
    });
  }

  num(data) {
    var count = 0;
    if (data) {
      data.foreach(element => {
        if (element.status == 0) {
          count += 1;
        }
      })
    }
  }



}

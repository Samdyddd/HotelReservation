import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { EvaluateService } from '../service/evaluate.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'userinfo',
  styleUrls: ['userinfo.css'],
  templateUrl: './userinfo.html'
})
export class UserInfoComponent implements OnInit {

  public orderInfo: any;
  public orderTime: any;
  public orderstatus = 0;
  public dis = false;
  public userName: any;

  public orderId: any;

  public idd: any;

  public evdis=true;

  // 评论
  foodreview: any;
  servicereview: any;

  private theValue: number = 0;

  public statusinfo: any;


  constructor(
    private orderService: OrderService,
    private evService: EvaluateService) {

    let userName = localStorage.getItem("currentUser");

    let name = JSON.parse(userName);
    let na = name.userName;
    this.userName = na;

    //名字获取订单 
    this.orderService.getOrderData(na).subscribe(ret => {
      let data = ret;
      this.orderInfo = data;
      if (this.orderInfo.status == 1) {
        this.orderstatus = 1;
      }
      if (this.orderInfo) {
        var id = this.orderInfo._id;
        this.orderId = id;
      }

      this.getid(this.orderId);
      this.test(this.orderId);

    })

    this.foodreview = {
      foodreviews: 1
    }
    this.servicereview = {
      servicereviews: 1
    }



  }

  public ngOnInit() {

  }

  // 增加评论
  addev() {
    let fo = this.foodreview.foodreviews;
    let se = this.servicereview.servicereviews;
    let content = document.getElementById('content').value;
    // console.log(content);
    // console.log(fo.foodreviews)
    let model = {
      Username: this.userName,
      content: content,
      foodreviews: fo,
      servicereviews: se,
      status: 1,
      orderId: this.orderId
    }
    let obj = JSON.stringify(model)
    console.log(model)
    this.evService.postEvData(obj).subscribe(ret => {
      let data = ret
      if (data.code == 1) {
        // console.log("评论成功");
        this.evdis=!this.evdis;
      }
    })
  }


  getid(id) {
    this.idd = id
  }

  test(id) {
    if (this.orderstatus == 1) {
      clearInterval(timer);
    }
    var that = this;
    var orderservice = this.orderService;
    // var id = this.idd;
    var timer = setInterval(function () {
      orderservice.postStatus(id).subscribe(ret => {
        let data = ret
        if (data.code == 1) {
          that.orderstatus = 1;
        }
      })
    }, 5000);

  }

  show(){
    this.dis = !this.dis;
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../app.service';
import { OrderService } from '../service/order.service';

import Picker from 'better-picker';


@Component({
  selector: 'ratings',
  styleUrls: ['order.css'],
  templateUrl: './order.html'
})
export class OrderComponent implements OnInit {

  public orderfood: any;
  public totalprice: any;
  public place: String;
  public seletetime: String;
  public nowtime: any;
  public userName: any;
  public foods: any;

  constructor(
    public router: Router,
    public appState: AppState,
    public orderService: OrderService) {
    this.orderfood = this.appState.get("foodlist")
    console.log(this.orderfood)
  }

  public ngOnInit() {
    let totalprice = 0;
    let userinfo = localStorage.getItem("currentUser");
    this.userName = JSON.parse(userinfo).userName;
    if (this.orderfood) {
      this.orderfood.forEach(element => {
        totalprice += Number(element.count * element.price)
      });
    }
    this.totalprice = totalprice;
    this.appState.set("foodlist", [])
  }


  show1() {
    let showPickerT = document.getElementById("showPickerTime");
    let now = new Date();
    let hour = now.getHours();
    let arr = [];
    let arr2 = [];
    for (let i = 0; i < 24; i++) {
      var obj = new Object(i);
      if (i > hour) {
        i = i < 10 ? '0' + i : i;
        obj['text'] = i;
        obj['value'] = i;
        arr.push(obj)
      }

    }
    for (let j = 0; j < 61; j++) {
      var obj = new Object(j);
      j = j < 10 ? '0' + j : j;
      obj['text'] = j;
      obj['value'] = j;
      arr2.push(obj)
    }
    var data2 = [
      {
        text: ':',
        value: 1
      },

    ];
    let picker = new Picker({
      data: [arr, data2, arr2],
      selectedIndex: [3, 0, 2],
      title: '只能选择今天'
    });

    picker.on('picker.select', function (selectedVal, selectedIndex) {
      showPickerT.innerText = arr[selectedIndex[0]].text + data2[selectedIndex[1]].text + arr2[selectedIndex[2]].text;
    })
    picker.show();
  }


  show2() {
    let showPickerR = document.getElementById("showPickerRoom");
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let arr1 = ["A", "B", "C", "D"];
    for (let i = 0; i < arr1.length; i++) {
      var obj = new Object(i);
      obj['text'] = arr1[i];
      obj['value'] = i;
      arr.push(obj)
    }

    for (let j = 0; j < 10; j++) {
      var obj = new Object(j);
      j = j < 10 ? '0' + j : j;
      obj['text'] = j;
      obj['value'] = j;
      arr2.push(obj)
    }

    for (let k = 0; k < 10; k++) {
      var obj = new Object(k);
      let j = k < 100 ? '00' + k : k;
      obj['text'] = j;
      obj['value'] = k;
      arr3.push(obj)
    }

    let picker = new Picker({
      data: [arr, arr2, arr3],
      selectedIndex: [0, 0, 2],
      title: '选择房号'
    });

    picker.on('picker.select', function (selectedVal, selectedIndex) {
      showPickerR.innerText = arr[selectedIndex[0]].text + arr2[selectedIndex[0]].text + arr3[selectedIndex[2]].text;
    })
    picker.show();
  }


  onOK() {

    let showPickerT = document.getElementById("showPickerTime");
    let showPickerR = document.getElementById("showPickerRoom");
    this.seletetime = showPickerT.innerHTML;
    if (showPickerR.innerHTML == "选择") {
      this.place = "餐厅";
    } else {
      this.place = showPickerR.innerHTML;
    }

    // 时间拼接
    var now = new Date();
    var year = now.getFullYear()
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var ymd = year + '/' + month + '/' + day;
    var time = this.seletetime + ':00';
    var arr = [ymd, time]
    var arr2 = arr.join(' ');
    console.log(arr2)


    this.orderfood.forEach(element => {
      element.image = null
    });
    console.log(this.orderfood)

    let obj = {
      userName: this.userName,
      goods: this.orderfood,
      time: new Date(arr2),
      place: this.place,
      totalprice: this.totalprice,
      status: 0
    }

    // console.log(obj)
    let model = JSON.stringify(obj)

    this.orderService.postOrderData(model)
      .subscribe(ret => {
        if (ret.code == 1) {
          console.log("提交成功");
          // localStorage.setItem("orderInfo", model)
          this.router.navigateByUrl("workspace/userinfo");
        } else {
          alert("提交失败")
        }
      })
  }


}

import { Component, OnInit } from '@angular/core';
import { SellService } from '../service/sell.service';
import { test } from './test.model';
import { flyLeft } from '../animate/flyLeft'

@Component({
  selector: 'header-top',
  styleUrls: ['header.css'],
  templateUrl: './header.html',
  animations: [flyLeft]
})
export class HeaderComponent implements OnInit {

  public headerData: any;

  public dis = false;

  public userName: any;

  constructor(public sellservice: SellService) {
    let userinfo = localStorage.getItem("currentUser");
    this.userName = JSON.parse(userinfo).userName;
  }

  public ngOnInit() {
    this.getHeader();
  }

  showDetail() {
    this.dis = !this.dis;
  }


  getHeader() {
    this.sellservice.getHotel()
      .subscribe(data => {
        this.headerData = data
      })
  }

}

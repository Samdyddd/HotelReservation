import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.html',
  styleUrls: ['./left-nav.css']
})
export class LeftNavComponent implements OnInit {

  public userName: any;
  constructor(
    public route: ActivatedRoute
  ) { 
    let userinfo = localStorage.getItem("currentUser");
    console.log(userinfo+"ddddddddd")
    this.userName= JSON.parse(userinfo).userName;
  }

  public ngOnInit() {

  }

}

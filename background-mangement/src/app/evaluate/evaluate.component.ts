import { Component, OnInit } from '@angular/core';

import { EvaluateService } from '../service/evaluate.service'

@Component({

  selector: 'evaluate',
  templateUrl: './evaluate.html',
  styleUrls:['evaluate.css']
})
export class EvaluateComponent implements OnInit {

  public evinfo:any;

  constructor(public evService: EvaluateService) {

  }

  public ngOnInit() {
    this.evService.GetEvData().subscribe(ret =>{
      this.evinfo = ret
      console.log(this.evinfo)
    })
  }



}

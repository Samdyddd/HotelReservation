import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'rollcontrol',
    templateUrl: './rollcontrol.html',
    styleUrls: ['rollcontrol.css']
})
export class RollControltComponent implements OnInit {
    @Input() food: Object;

    foodarr = [];

    public ngOnInit() {

    }

    add() {
        if (!this.food['count'] || this.food['count'] == 0) {
            this.food['count'] = 1;
        } else {
            this.food['count'] += 1
        }
    }

    reduce() {
        this.food['count'] -= 1
    }


    selectfood(data) {
        // var foodarr = [];
        if (data['count'] > 0) {
            this.foodarr.push(this.food)
        }
        return this.foodarr;
    }




}

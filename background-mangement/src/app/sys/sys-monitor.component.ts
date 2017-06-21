import { Component, OnInit } from '@angular/core';
import { SysService } from '../service/sys.service'

@Component({
    selector: 'sys-monitor',
    templateUrl: './sys-monitor.html',
    styleUrls: ['./sys-monitor.css']
})
export class SysMonitorComponent implements OnInit {

    public daydata: any;
    public pieChart: any;
    public lineChart: any;
    public orderinfo:any;

    public evinfo:any;


    constructor(public sysservice: SysService) {
        this.createdate();
        this.sysservice.GetSysData().subscribe(ret => {
            console.log(ret)
            this.orderinfo = ret;
        })

        this.sysservice.GetEvcount().subscribe(ret =>{
            this.evinfo = ret
            console.log(ret)
        })


    }

    ngOnInit() {
    
    }





    showsev() {
        let pieChart = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.daydata,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '线上营业额',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.orderinfo
                }
            ]
        };

        this.pieChart = pieChart;
    }


    showev() {
        let lineChart = {
            title: {
                text: '订单评价'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['菜品评价', '服务评价']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.daydata
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '菜品评价',
                    type: 'line',
                    stack: '总量',
                    data: this.evinfo.foodreviews
                },
                {
                    name: '服务评价',
                    type: 'line',
                    stack: '总量',
                    data: this.evinfo.servicereviews
                }
            ]
        };
        this.lineChart = lineChart;
    }



    createdate() {
        let arr = [];
        let dataStr = '';
        let now = new Date();
        let year = now.getFullYear();
        dataStr += year + '-'
        let mon = now.getMonth() + 1;
        dataStr += (mon < 10 ? '0' : '') + mon + '-';
        let day = now.getDate();
        dataStr += (day < 10 ? '0' : '') + day;
        // console.log(dataStr)
        let oneDay = 24 * 60 * 60 * 1000;

        //七天
        let sevenDay = new Date(dataStr).getTime() - 7 * oneDay;
        // console.log(sevenDay)
        // 输出七天
        for (let i = 0; i < 7; i++) {
            let _mon = new Date(sevenDay + oneDay * i).getMonth() + 1;
            let _day = new Date(sevenDay + oneDay * i).getDate();
            let _str = _mon + '月' + _day + '日';
            arr.push(_str);
        }
        console.log(arr);
        this.daydata = arr;
    }






}

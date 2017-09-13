
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

//import {Ng2Highcharts, Ng2Highmaps, Ng2Highstocks} from 'ng2-highcharts';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import {ChartModule} from 'primeng/primeng';


@Component({
  moduleId: module.id,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']

})

//.安装hightcharts
//npm install highcharts --save
//typings install dt~highcharts --global --save
// http://www.jianshu.com/p/e187c27e257e
export class ChartComponent {


  // Doughnut
  public doughnutChartLabels: string[] = ['Eagle主机', 'NBIOT','Doppio主机网关', '第三方主机'];
 

  public offlineLineChartLabels: number[] = [-24, -23, -22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0];
  public offlineLineChartData: any[] = [
    { data: [0,0,0,0,0,0,0,0,0,0,0,0,5,10,6,2,0,0,0,0,0,0,0,0,2], label: '离线趋势图'}
  ];
  public offlineLineChartType: string = 'line';

  doughnutChartData: number[] = [];
  lineChartData: any[] = [];
  onlineOfflineData: any;
  deviceTypeData: any;
  alarmNumByCustoms:any;

  constructor(private comEvent: ComEvent, private mCusomList: CustomList) {
    comEvent.mComEvent.subscribe((sJson: string) => {
      let rep = JSON.parse(sJson);
      if (rep['action'] == "update-top-chart") {
        /// Doughnut update
        var panelType = this.mCusomList.getTotalPanelType();
        var doughnutData: Array<number> = [];
        doughnutData[0] = panelType.eagle;
        doughnutData[1] = panelType.NBIOT;
        doughnutData[2] = panelType.doppioGateway;
        //doughnutData[3] = panelType.totalThirdPartyPanel;
        doughnutData[3] = 1;
        this.doughnutChartData = doughnutData;

         this.deviceTypeData = {
            labels: this.doughnutChartLabels,
            datasets: [
                {
                    data: this.doughnutChartData,
                    backgroundColor: [
                        "#1792e5",
                        "#9AC066",
                        "#FED05E",
                        "#F38B53"
                    ],
                    hoverBackgroundColor: [
                        "#1792e5",
                        "#9AC066",
                        "#FED05E",
                        "#F38B53"
                    ]
                }]    
            };


        /// lineChart update
        let data: any = this.mCusomList.getChartsData();
        this.onlineOfflineData = {
            labels: data.customs,
            datasets: [
                {
                    label: '在线',
                    backgroundColor: '#1792e5',
                    borderColor: '#1792e5',
                    data: data.online
                },
                {
                    label: '离线',
                    backgroundColor: '#8bc9f2',
                    borderColor: '#8bc9f2',
                    data: data.offline
                }
            ]
        }
      }
    });
  }

  ngOnInit(){

    /// Doughnut update
        var panelType = this.mCusomList.getTotalPanelType();
        var doughnutData: Array<number> = [];
        doughnutData[0] = panelType.eagle;
        doughnutData[1] = panelType.NBIOT;
        doughnutData[2] = panelType.doppioGateway;
        //doughnutData[3] = panelType.totalThirdPartyPanel;
        doughnutData[3] = 1;
        this.doughnutChartData = doughnutData;

         this.deviceTypeData = {
            labels: this.doughnutChartLabels,
            datasets: [
                {
                    data: this.doughnutChartData,
                    backgroundColor: [
                        "#1792e5",
                        "#9AC066",
                        "#FED05E",
                        "#F38B53"
                    ],
                    hoverBackgroundColor: [
                        "#1792e5",
                        "#9AC066",
                        "#FED05E",
                        "#F38B53"
                    ]
                }]    
            };


        /// lineChart update
        let data: any = this.mCusomList.getChartsData();
        this.onlineOfflineData = {
            labels: data.customs,
            datasets: [
                {
                    label: '在线',
                    backgroundColor: '#1792e5',
                    borderColor: '#1792e5',
                    data: data.online
                },
                {
                    label: '离线',
                    backgroundColor: '#8bc9f2',
                    borderColor: '#8bc9f2',
                    data: data.offline
                }
            ]
        }


    this.alarmNumByCustoms = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: '保安中心NBIot',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#f37021'
                },
             
                {
                    label: '工商银行',
                    data: [69, 50, 80, 51, 56, 33, 40],
                    fill: false,
                    borderColor: '#1792e5'
                }
/*
                {
                    label: '保安中心DOPPIO',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: '个人用户1',
                    data: [20, 45, 40, 19, 39, 27, 22],
                    fill: false,
                    borderColor: '#1E88E5'
                },
                {
                    label: '建设银行',
                    data: [80, 30, 25, 51, 66, 33, 36],
                    fill: false,
                    borderColor: '#36A2EB'
                },
                {
                    label: '肯德基',
                    data: [36, 77, 65, 51, 21, 33, 40],
                    fill: false,
                    borderColor: '#9CCC65'
                }  */  
            ]
        }


    ///离线趋势图
    var date = new Date();
    for(var i=0; i< this.offlineLineChartLabels.length; i++){
      this.offlineLineChartLabels[i] = date.getHours() + this.offlineLineChartLabels[i];
      if(this.offlineLineChartLabels[i] < 0){
        this.offlineLineChartLabels[i] = 24 + this.offlineLineChartLabels[i];
      }
    }
  }


  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
    //console.log("get event sunny++++++++");
  }

  public chartClickedLine(e: any): void {
    console.log(e);
    //console.log("get event sunny++++++++");
    
  }

  public chartHoveredLine(e: any): void {
    console.log(e);
    
  }

}
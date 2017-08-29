import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import {Message} from 'primeng/primeng';

export class Btn {
	id: string;
	name: string;
}
const BtnList: Btn[] = [
	{ id: "top-chart", name: '总览图表'},
	{ id: "top-panel", name: '主机' },
	{ id: "top-map", name: '地图' },
	{ id: "top-query", name: '查询' },
	{ id: "top-edit", name: '编辑' }
];
@Component({
	moduleId: module.id,
	selector: 'top-menu',
	templateUrl: './topMenu.component.html',
	styleUrls: ['./topMenu.component.css']

})

export class TopMenuComponent {

	btnList = BtnList;
	public alerts: any = [{}];
	alarmMsg: number = 0;
	msgs: Message [] = [];


	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			if (rep['action'] == 'push-alarmMsg') {
				//this.pushMsg(rep['devicename'] + rep['myinfo']);
				console.log(rep['devicename'] + ":----" + rep['myinfo']);
				let msg:Message = {severity:'error', summary:rep['devicename'], detail:rep['myinfo']};
				this.msgs[0] = msg;
				var myAuto = <any>document.getElementById('myaudio');
				myAuto.play();
				this.mCusomList.mAlarmFlag = true;
			}
		});

	}
	clickBtn(btn: Btn): void {
		this.comEvent.mComEvent.emit('{"action":"' + btn.id + '"}');

		if("top-chart" == btn.id)
		{
			this.comEvent.mComEvent.emit('{"action":"' + "update-top-chart" + '"}');
		}
	}

	public pushMsg(devicename: string): void {

		this.alarmMsg++;

		this.alerts = this.alerts.map((alert: any) => ({
			timeout: 3000,
			type: 'danger',
			msg: " " + devicename
		}));
		
	}

}

//  http://leftstick.github.io/angular2-baidu-map/
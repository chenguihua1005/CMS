import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Custom } from '../services/custom';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import { Panel } from '../services/panel';

@Component({
	moduleId: module.id,
	selector: 'custom-table',
	templateUrl: './customTable.component.html',
	styleUrls: ['./customTable.component.css']

})
export class CustomTableComponent {
	public totalItems: number = 0;


	public customListData: Array < Custom > = [];
	public customList: Array < Custom > = [];
	public mDevicename: string;
	panelList:Map<string,Array< Panel >> = new Map<string,[Panel]>();
	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			//console.log("#customTable#####"+sJson);
			let rep = JSON.parse(sJson);

		});


	}
	ngOnInit() {
		this.customListData = this.mCusomList.getCustomList();

		this.totalItems = this.customListData.length;
		console.log("#customTable1#####" + this.customListData.length);
		this.customList = [];
		for(let i = 0; i < 10; i++) {
			if(i < this.customListData.length) {
				this.customList[i] = this.customListData[i];
				let customid = this.customList[i].customid;
				this.panelList[customid] = this.mCusomList.getCustomPanelList(customid);
			}
		}


	}

	onSelectPanel(hero: Custom): void {
		console.log("=======onSelectPanel======="+hero.customid);


	}
	public editBtn(cur: Custom): void {
		//console.log(zone);
		for(let i = 0; i < this.customList.length; i++) {
			if(this.customList[i] != cur){
				this.customList[i].checked = false;
			}
		}
		if(cur.checked == true){
			//this.comEvent.mComEvent.emit('{"action":"dialog-editZone"}');
		}
  }
}

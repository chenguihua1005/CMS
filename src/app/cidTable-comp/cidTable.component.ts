import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Cid } from '../services/cid';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';

@Component({
	moduleId: module.id,
	selector: 'cid-table',
	templateUrl: './cidTable.component.html',
	styleUrls: ['./cidTable.component.css']

})
export class CidTableComponent {
	public totalItems: number = 64;
	public currentPage: number = 1;

	public cidListData: Array<Cid> = [];
	public cidList: Array<Cid> = [];
	public mDevicename: string;
	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			//console.log("#accountTable#####"+sJson);
			let rep = JSON.parse(sJson);
			if (rep['action'] == "press-customid") {
				this.cidListData = this.mCusomList.getCidList();
				this.totalItems = this.cidListData.length;
				console.log("#cid table#####" + this.cidListData.length);
				this.cidList = [];
				for (let i = 0; i < 10; i++) {
					if (i < this.cidListData.length) {
						this.cidList[i] = this.cidListData[i];
					}
				}
			}

		});

	}
	ngOnInit() {
		this.cidListData = this.mCusomList.getCidList();
		this.totalItems = this.cidListData.length;
		//console.log("#accountTable1#####" + this.cidListData.length);
		this.cidList = [];
		for (let i = 0; i < 10; i++) {
			if (i < this.cidListData.length) {
				this.cidList[i] = this.cidListData[i];
			}
		}
	}
	public setPage(pageNo: number): void {
		this.currentPage = pageNo;
	}

	public pageChanged(event: any): void {
		console.log('Page changed to: ' + event.page);
		console.log('Number items per page: ' + event.itemsPerPage);

		let pageNo = event.page;
		this.cidList = [];
		for (let i = (pageNo - 1) * 10; i < pageNo * 10; i++) {
			if (i < this.cidListData.length) {
				this.cidList[i - (pageNo - 1) * 10] = this.cidListData[i];
			}
		}
	}

	public setDate(date: any): any {
		let newDate = new Date();
		newDate.setTime(date * 1000);
		let timeCn = newDate.toJSON();
		return timeCn;
	}


	public editBtn(cur: Cid): void {
		//console.log(zone);
		for (let i = 0; i < this.cidList.length; i++) {
			if (this.cidList[i] != cur) {
				this.cidList[i].checked = false;
			}
		}
		if (cur.checked == true) {
			//this.comEvent.mComEvent.emit('{"action":"dialog-editZone"}');
		}
	}
}
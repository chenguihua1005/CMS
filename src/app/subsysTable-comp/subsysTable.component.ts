import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subsys } from '../services/subsys';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';


@Component({
	moduleId: module.id,
	selector: 'subsys-table',
	templateUrl: './subsysTable.component.html',
	styleUrls: ['./subsysTable.component.css']

})
export class SubsysTableComponent {
	public subsysListData: Array<Subsys> = [];
	public subsysList: Array<Subsys> = [];

	public totalItems: number = 0;
	public mDevicename: string;

	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			if (rep['action'] == "push-subsysMsg") {
				//if(this.mDevicename == rep['devicename'] )
				//this.subsysList = this.mCusomList.getCustomPanelSubsysList(this.mDevicename);
			} else if (rep['action'] == "press-panel") {
				this.subsysListData = this.mCusomList.getCustomPanelSubsysList();

				this.totalItems = this.subsysListData.length;
				console.log("#customTable1#####" + this.subsysListData.length);
			}

		})

	}
	ngOnInit() {
		this.subsysListData = this.mCusomList.getCustomPanelSubsysList();
		this.totalItems = this.subsysListData.length;
		console.log("#customTable1#####" + this.subsysListData.length);

	}
	
	public editBtn(subsys: Subsys): void {
		console.log(subsys);
		for (let i = 0; i < this.subsysList.length; i++) {
			if (this.subsysList[i] != subsys) {
				this.subsysList[i].checked = false;
			}
		}
		if (subsys.checked == true) {
			//this.comEvent.mComEvent.emit('{"action":"dialog-editSubsys"}');
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Domain } from '../services/domain';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';

@Component({
	moduleId: module.id,
	selector: 'domain-table',
	templateUrl: './domainTable.component.html',
	styleUrls: ['./domainTable.component.css']

})
export class DomainTableComponent {
	public totalItems: number = 64;

	public domainListData: Array < Domain > = [];
	public domainList: Array < Domain > = [];
	public mDevicename: string;
		//add delete modify
	displayDialog : Boolean;
	domain:Domain = new Domain();
	selectedDomain: Domain;
	newDomain: Boolean;
	display: boolean = false;
	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			//console.log("#domainTable#####"+sJson);
			let rep = JSON.parse(sJson);

		});

	}
	ngOnInit() {
		this.domainListData = this.mCusomList.getDomainList();

		this.totalItems = this.domainListData.length;
		console.log("#domainTable1#####" + this.domainListData.length);
		this.domainList = [];
		for(let i = 0; i < 10; i++) {
			if(i < this.domainListData.length) {
				this.domainList[i] = this.domainListData[i];
			}
		}
	}

	showDialogToAdd() 
	{
        this.newDomain = true;
        this.domain = new Domain();
		this.displayDialog = true;
	    }
	    onRowSelect(event) {
	        this.newDomain = false;
	        //this.domain = this.cloneCar(event.data);
	        this.displayDialog = true;
	    }
    
/*
	public setDate(date: any): any {
		let newDate = new Date();
		newDate.setTime(date * 1000);
		let timeCn = newDate.toJSON();
		return timeCn;
	}
*/	
	
	public editBtn(cur: Domain): void {
    //console.log(zone);
    for(let i = 0; i < this.domainList.length; i++) {
    	if(this.domainList[i] != cur){
 			this.domainList[i].checked = false;
 		}
 	}
    if(cur.checked == true){
    	//this.comEvent.mComEvent.emit('{"action":"dialog-editZone"}');
    }
  }
}
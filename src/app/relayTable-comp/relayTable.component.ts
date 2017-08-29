import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subsys } from '../services/subsys';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';


@Component({
  moduleId: module.id,
  selector: 'relay-table',
  templateUrl: './relayTable.component.html',
  styleUrls: ['./relayTable.component.css']

})
export class RelayTableComponent {
  //public subsysListData: Array<Subsys> = [];
  //public subsysList: Array<Subsys> = [];
  //
  //public totalItems: number = 0;
  //public currentPage: number = 1;
  // public mDevicename:string;
  // 
  // 	constructor(private comEvent:ComEvent,private mCusomList: CustomList) {
  // 		for(let i = 0; i < 5; i++) {
  // 			this.subsysListData[i] = new Subsys();
  // 			this.subsysListData[i].name = "子系统" + i;
  // 			this.subsysListData[i].status = "0";
  // 		}
  // 		this.totalItems = this.subsysListData.length;
  // 		
  // 		for(let i = 0; i < 5; i++) {
  // 			this.subsysList[i] = this.subsysListData[i];
  // 		}
  // 		comEvent.mComEvent.subscribe((sJson: string) => {
  //			let rep = JSON.parse(sJson);
  //			if(rep['action'] == "push-subsysMsg") {
  //				if(this.mDevicename == rep['devicename'] )
  //					this.subsysList = this.mCusomList.getCustomPanelSubsysList(this.mDevicename);
  //			}else if(rep['action'] == "press-panel"){
  //				this.mDevicename = rep['devicename'];
  //				this.subsysList = this.mCusomList.getCustomPanelSubsysList(this.mDevicename);
  //			}
  //
  //		})
  //		
  //	}
  //public setPage(pageNo: number): void {
  //  this.currentPage = pageNo;
  //}
  // 
  //public pageChanged(event: any): void {
  //  console.log('Page changed to: ' + event.page);
  //  console.log('Number items per page: ' + event.itemsPerPage);
  //  
  //  let pageNo = event.page;
  //  for(let i = (pageNo-1)*10; i < pageNo*10; i++) {
  // 		this.subsysList[i-(pageNo-1)*10] = this.subsysListData[i];
  // 	}
  //}
  // public editBtn(subsys: Subsys): void {
  //  console.log(subsys);
  //  for(let i = 0; i < this.subsysList.length; i++) {
  //  	if(this.subsysList[i] != subsys){
  // 			this.subsysList[i].checked = false;
  // 		}
  // 	}
  //  if(subsys.checked == true){
  //  	//this.comEvent.mComEvent.emit('{"action":"dialog-editSubsys"}');
  //  }
  //}
}

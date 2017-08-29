import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Zone } from '../services/zone';
import { Subsys } from '../services/subsys';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import { CmdPacket } from '../services/cmdPacket';
import { WebsocketClient } from "../services/websocket";

@Component({
	moduleId: module.id,
	selector: 'zone-table',
	templateUrl: './zoneTable.component.html',
	styleUrls: ['./zoneTable.component.css']

})
export class ZoneTableComponent {
	public zoneListData: Array<Zone> = [];
	public zoneList: Array<Zone> = [];
	public subsysList: Array<Subsys> = [];
	public totalItems: number = 0;
	public currentPage: number = 1;
	public mDevicename: string;
	public 	newZone: Boolean;
	displayDialog : Boolean;
	seletedzone:Zone;
	zone:Zone = new Zone();
	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) {
		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			if (rep['action'] == "push-zoneMsg") {
				this.zoneListData =[];
				this.zoneListData = this.mCusomList.getCustomPanelZoneList(rep["subsysid"]);
			} else if (rep['action'] == "press-panel") {
				this.zoneListData = this.mCusomList.getCustomPanelZoneList(0);
				this.subsysList = this.mCusomList.getCustomPanelSubsysList();

				this.totalItems = this.zoneListData.length;
			}
			else if (rep['action'] == "transit-ack") {
				console.log(rep);
			}
				
		})

	}
	ngOnInit() {
		this.zoneList =[];
		this.zoneListData = this.mCusomList.getCustomPanelZoneList(0);
		this.subsysList = this.mCusomList.getCustomPanelSubsysList();

		this.totalItems = this.zoneListData.length;
	}

	 onRowSelect(event) {
		this.displayDialog = true;
		this.zone = new Zone();
		this.zone =event.data;
		return this.seletedzone;
	}

	public silence(event): void {
		let	req = this.cmdPacket.gettransitdata(this.zone.subsysid,this.zone.zoneid);
		this.ws.doSend(req);
	}	
}

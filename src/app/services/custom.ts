import { Component, Injectable, EventEmitter } from '@angular/core';

import { Panel } from './panel';
import { Zone } from './zone';
import { Scene } from './scene';
import { Alarm } from './alarm';
import { Cid } from './cid';

@Injectable()
export class Custom {
	public address: string;
	private panelList: Map<string, Panel> = new Map<string, Panel>();
	private cidList: Map<string, Cid> = new Map<string, Cid>();
	public customid: string;
	
	public name: string;
	private telephone: string;
	public checked: boolean;

	constructor() { }
	public findPanel(devicename: string): void {
		return this.panelList[devicename];
	}
	

	public getEagleTypeCount(): number {
		let size = 0;

		for(let k in this.panelList) {
			if(this.panelList[k].isEaglePanel()) {
				size++;
			}
		}
		return size;
	}

	public getNBIOTTypeCount(): number {
		let size = 0;
		for(let k in this.panelList)
		{
			if(this.panelList[k].isNBIOT()) {
				size++;
			}
		}
		return size;
	}

	public getDoppioGatewayTypeCount(): number {
		let size = 0;
		for(let k in this.panelList)
		{
			if(this.panelList[k].isDoppioGateway()) {
				size++;
			}
		}
		return size;
	}

	public getThirdPartyPanelTypeCount(): number {
		let size = 0;
		for(let k in this.panelList)
		{
			if(this.panelList[k].isThirdPartyPanel()) {
				size++;
			}
		}
		return size;
	}
	public getTotalPanelType(): any {
		let data;
		data = { eagle: this.getEagleTypeCount(),
				 NBIOT: this.getNBIOTTypeCount(),
				 doppioGateWay: this.getDoppioGatewayTypeCount(),
				 thirdPartyPanel: this.getThirdPartyPanelTypeCount()
		};

		return data;
	}

	public getOnlinePanelCount(): number {
		let size = 0;
		for (let k in this.panelList) {
			if (this.panelList[k].online === 1) {
				size++;
			}
		}
		return size;
	}
	public getOfflinePanelCount(): number {
		let size = 0;
		for (let k in this.panelList) {
			if (this.panelList[k].online === 0) {
				size++;
			}
		}
		return size;
	}
	public setCustom(sJson: any): void {
		this.customid = sJson['customid'];
		this.address = sJson['address'];
		this.name = sJson['name'];
		this.telephone = sJson['telephone'];
		//console.log(this.customid);
	}

	public getCustomName(): string {
		return this.name;
	}
	public setPanel(sJson: any): void {
		let devicename = sJson['devicename'];
		if (this.panelList[devicename] == null) {
			this.panelList[devicename] = new Panel(); // 1 

			//2let panel = new Panel(); 
			//2panel.setPanel(sJson); 
			//2this.panelList.set(devicename, panel); 
		}
		//else
		//{
			//2this.panelList.get(devicename).setPanel(sJson); 
		//}
		this.panelList[devicename].setPanel(sJson); // 1 

	}
	public setCid(sJson: any): void {
		let cid = sJson['cid'];
		if (this.cidList[cid] == null) {
			this.cidList[cid] = new Cid();
		}
		this.cidList[cid].setCid(sJson);


	}
	public getPanelList(): any {
		let arr: Array<Panel> = [];
		let i = 0;
		for (let k in this.panelList) // for acts as a foreach
		{
			//alert(array[v]);
			arr[i] = this.panelList[k];
			i++;
		}
		// console.log("#####################arr:");
		//console.log(arr);
		return arr;

	}
	public getPanelZoneList(subsysid: number, devicename: string): any {
		let arr: Array<Zone> = [];
		if (this.panelList[devicename] != null) {
			arr = this.panelList[devicename].getZoneList(subsysid);
		}

		return arr;
	}
	public getPanelSceneList(subsysid: number, devicename: string): any {
		let arr: Array<Scene> = [];
		if (this.panelList[devicename] != null) {
			arr = this.panelList[devicename].getSceneList(subsysid);
		}
		return arr;
	}
	public getPanelAlarmList(devicename: string): any {
		console.log("getPanelAlarmList 111"+this.panelList+"  "+devicename);
		let arr: Array<Alarm> = [];
		if (this.panelList[devicename] != null) {
			console.log("getPanelAlarmList 222  "+devicename);
			arr = this.panelList[devicename].getAlarmList();
		}
		return arr;
	}
	public getPanelSubsysList(devicename: string): any {
		let arr: Array<Alarm> = [];
		if (this.panelList[devicename] != null) {
			arr = this.panelList[devicename].getSubsysList();
		}
		return arr;
	}
	public getCidList(): any {
		let arr: Array<Cid> = [];
		let i = 0;
		for (let k in this.cidList) {
			arr[i] = this.cidList[k];
			i++;
		}
		//console.log("#####################arr:");
		//console.log(arr);
		return arr;
	}
}
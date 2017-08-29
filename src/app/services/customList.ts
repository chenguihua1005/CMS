import { Component, Injectable, EventEmitter } from '@angular/core';
import { Custom } from './custom';
import { Zone } from './zone';
import { Alarm } from './alarm';
import { Scene } from './scene';
import { Subsys } from './subsys';
import { Account } from './account';
import { Domain } from './domain';
import { Cid } from './cid';
import { Const } from './const';

@Injectable()
export class CustomList {
	public mCustomList: Map<string, Custom> = new Map<string, Custom>();
	public mAccountList: Map<string, Account> = new Map<string, Account>();
	public mDomainList: Map<string, Domain> = new Map<string, Domain>();
	public mConst = new Const();
	public curDeviceName = "device1";
	public curCustomid = "client1";
	public mCurDomainid = "";
	public mAlarmFlag = false;
	public opername: string;
	public pwd: string;


	customList: Array<Custom> = [];   //for main menu custom panel data

	constructor() {
	}

	public getPanelType(): any {
		let eagleCountList: Array<number> = [];
		let NBIOTCountList: Array<number> = [];
		let doppioGatewayCountList: Array<number> = [];
		let thirdPartyPanelCountList: Array<number> = [];
		let custumList: Array<number> = [];

		for(let k in this.mCustomList) {
			eagleCountList.push(this.mCustomList[k].getEagleTypeCount());
			NBIOTCountList.push(this.mCustomList[k].getNBIOTTypeCount());
			doppioGatewayCountList.push(this.mCustomList[k].getDoppioGatewayTypeCount());
			thirdPartyPanelCountList.push(this.mCustomList[k].getThirdPartyPanelTypeCount());
			custumList.push(this.mCustomList[k].getCustomName());
		}

			let data = {eagle: eagleCountList,
						NBIOT: NBIOTCountList,
					    doppioGateWay: doppioGatewayCountList,
						thirdParty: thirdPartyPanelCountList,
						custom: custumList};
		return data;
	}
	public getTotalPanelType(): any {
		let totalEagle: number = 0;
		let totalNBIOT: number = 0;
		let totalDoppioGateway: number = 0;
		let totalThirdPartyPanel: number = 0;

		let count: number = 0;

		for(let k in this.mCustomList)
		{
			totalEagle = totalEagle + this.mCustomList[k].getTotalPanelType().eagle;
			totalNBIOT = totalNBIOT + this.mCustomList[k].getTotalPanelType().NBIOT;
			totalDoppioGateway = totalDoppioGateway + this.mCustomList[k].getTotalPanelType().doppioGateWay;
        	totalThirdPartyPanel = totalThirdPartyPanel + this.mCustomList[k].getTotalPanelType().thirdParty;
		}

		let data = {eagle: totalEagle,
					NBIOT: totalNBIOT,
					doppioGateway: totalDoppioGateway,
					thirdPartyPanel: totalThirdPartyPanel};
		return data;			
	}

	public getChartsData(): any {
		let online: Array<number> = [];
		let offline: Array<number> = [];
		let customs: Array<string> = [];
		for (let k in this.mCustomList) {
			online.push(this.mCustomList[k].getOnlinePanelCount());
			offline.push(this.mCustomList[k].getOfflinePanelCount());
			customs.push(this.mCustomList[k].name);
			//console.log(this.mCustomList[k]);
		}
		let data = { online: online, offline: offline, customs: customs };
		return data;
	}
	public getZoneStatus(status: string): string {
		return this.mConst.getZoneStatus(status);
	}
	public getZoneType(type: number): string {
		return this.mConst.getZoneType(type);
	}
	public getCidParse(cid: string): string {
		return this.mConst.getCidParse(cid);
	}
	public setCurDeviceName(devicename: string): void {
		this.curDeviceName = devicename;
	}
	public getCurDeviceName(): string {
		return this.curDeviceName;
	}
	public setCurCustomid(customid: string): void {
		this.curCustomid = customid;
	}
	public getCurCustomid(): string {
		return this.curCustomid;
	}
	public setCurDomainid(domainid: string): void {
		this.mCurDomainid = domainid;

	}
	public getCurDomainid(): string {
		return this.mCurDomainid;
	}

	public setAccount(sJson: any): void {

		let name = sJson['name'];
		if (this.mAccountList[name] == null) {
			//console.log("=====3=========");
			this.mAccountList[name] = new Account();
		}
		this.mAccountList[name].setAccount(sJson);
		//console.log(this.mAccountList);

	}
	public setCustom(sJson: any): void {

		let customid = sJson['customid'];
		if (this.mCustomList[customid] == null) {
			//console.log("=====3=========");
			 this.mCustomList[customid] = new Custom(); //1

			//2 let custom = new Custom(); 
			//2 custom.setCustom(sJson); 
			//2 this.mCustomList.set(customid, custom); 
		}
		//else
		//{
			//2 this.mCustomList.get(customid).setCustom(sJson); 	
		//}
		
		this.mCustomList[customid].setCustom(sJson);  //1
		//1 console.log(this.mCustomList);

	}
	public setDomain(sJson: any): void {

		let domainid = sJson['domainid'];
		if (this.mDomainList[domainid] == null) {
			//console.log("=====3=========");
			this.mDomainList[domainid] = new Domain();
		}
		this.mDomainList[domainid].setDomain(sJson);
	}
	public setCustomPanel(customid: string, sJson: any): void {
		//console.log("=====setCustomPanelList 1=========");
		if (this.mCustomList[customid] == null) {
			//console.log("=====setCustomPanelList 3=========");
			this.mCustomList[customid] = new Custom();
		}
		this.mCustomList[customid].setPanel(sJson);
	}
	public setCid(sJson: any): void {
		let customid = sJson['customid'];
		let cid = sJson['cid'];
		if (this.mCustomList[customid] == null) {
			this.mCustomList[customid] = new Custom();
		}
		this.mCustomList[customid].setCid(sJson);


	}
	public getCidList(): any {
		let arr: Array<Cid> = [];
		if (this.mCustomList[this.curCustomid] == null) {
			return arr;
		}
		return this.mCustomList[this.curCustomid].getCidList();
	}
	public getCustomPanelList(customid: string): any {
		return this.mCustomList[customid].getPanelList();
	}
	public setCustomPanelZone(devicename: string, sJson: any): void {
		//console.log("=====setCustomPanelList 1=========");
		for (let k in this.mCustomList) {
			if (this.mCustomList[k].panelList[devicename] != null) {
				this.mCustomList[k].panelList[devicename].setZone(sJson);
			}
		}
	}
	public setCustomPanelScene(devicename: string, sJson: any): void {
		//console.log("=====setCustomPanelList 1=========");

		for (let k in this.mCustomList) {
			if (this.mCustomList[k].panelList[devicename] != null) {
				this.mCustomList[k].panelList[devicename].setScene(sJson);
			}
		}
	}
	public setCustomPanelAlarm(devicename: string, sJson: any): void {
		//console.log("=====setCustomPanelAlarm 1111========="+devicename);

		for (let k in this.mCustomList) {
			if (this.mCustomList[k].panelList[devicename] != null) {
				//console.log("=====setCustomPanelAlarm 2222========="+devicename);
				this.mCustomList[k].panelList[devicename].setAlarm(sJson);
			}
		}
	}
	public setCustomPanelSubsys(devicename: string, sJson: any): void {
		//console.log("=====setCustomPanelList 1=========");

		for (let k in this.mCustomList) {
			if (this.mCustomList[k].panelList[devicename] != null) {
				this.mCustomList[k].panelList[devicename].setSubsys(sJson);
			}
		}
	}
	public getCustomList(): any {
		//console.log("=====setCustomPanelList 1=========");
		let arr: Array<Custom> = [];
		let i = 0;
		for (let k in this.mCustomList) {
			arr[i] = this.mCustomList[k];
			i++;
		}
		return arr
	}
	public getDomainList(): any {
		//console.log("=====setCustomPanelList 1=========");
		let arr: Array<Domain> = [];
		let i = 0;
		for (let k in this.mDomainList) {
			arr[i] = this.mDomainList[k];
			i++;
		}
		return arr
	}
	public getCustomPanelZoneList(subsysid: number): any {
		//console.log("=====setCustomPanelList 1=========");
		let devicename = this.curDeviceName;
		let arr: Array<Zone> = [];
		for (let k in this.mCustomList) {
			if (this.mCustomList[k].findPanel(devicename) != null) {
				arr = this.mCustomList[k].getPanelZoneList(subsysid, devicename);
				return arr
			}
		}
		return arr
	}
	public getCustomPanelSceneList(subsysid: number): any {
		//console.log("=====setCustomPanelList 1=========");
		let devicename = this.curDeviceName;
		let arr: Array<Scene> = [];
		for (let k in this.mCustomList) {
			if (this.mCustomList[k].findPanel(devicename) != null) {
				arr = this.mCustomList[k].getPanelSceneList(subsysid, devicename);
				return arr
			}
		}
		return arr
	}
	public getCustomPanelAlarmList(devicename: string): any {
		console.log("=====getCustomPanelAlarmList 1========="+devicename);
		let arr: Array<Alarm> = [];
		for (let k in this.mCustomList) {
			if (this.mCustomList[k].findPanel(devicename) != null) {
				console.log("=====getCustomPanelAlarmList 2========="+devicename);
				arr = this.mCustomList[k].getPanelAlarmList(devicename);
				return arr
			}
		}
		return arr
	}
	public getCustomPanelSubsysList(): any {
		let devicename = this.curDeviceName;
		//console.log("=====setCustomPanelList 1========="+devicename);
		let arr: Array<Subsys> = [];
		for (let k in this.mCustomList) {
			if (this.mCustomList[k].findPanel(devicename) != null) {
				arr = this.mCustomList[k].getPanelSubsysList(devicename);
				return arr
			}
		}
		return arr
	}
	public getAccountList(): any {

		let arr: Array<Account> = [];
		let i = 0;
		for (let k in this.mAccountList) {
			if (this.mAccountList[k].type < 2000) {
				arr[i] = this.mAccountList[k];
				i++;
			}
		}
		return arr;
	}
	public getAccountList2(): any {

		let arr: Array<Account> = [];
		let i = 0;
		for (let k in this.mAccountList) {
			if (this.mAccountList[k].type > 2000) {
				arr[i] = this.mAccountList[k];
				i++;
			}
		}
		return arr;
	}

}

//{"action":"clientgetdevicelist-ack","idack":"0","errorcode":0,"errormsg":"成功","customid":"icbc01",
//"devicelist":[{"describe":"1-金桥支行","devicename":"device0","type":"device@23turbo","x":121.629,"y":31.20},
//{"describe":"4-徐家汇支行","devicename":"device12","type":"device@23turbo","x":121.627,"y":31.2070},":"de

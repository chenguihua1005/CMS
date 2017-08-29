import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { WebsocketClient } from '../services/websocket';
import { ComEvent } from '../services/comEvent';
import { CmdPacket } from '../services/cmdPacket';
import { Panel } from '../services/panel';
import { Cid } from '../services/cid';
import { Zone } from '../services/zone';
import { Scene } from '../services/scene';
import { Subsys } from '../services/subsys';
import { Alarm } from '../services/alarm';
import { Custom } from '../services/custom';
import { Domain } from '../services/domain';
import { CustomList } from '../services/customList';


//for primeng
import { MenuItem } from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'main-menu',
	templateUrl: './mainMenu.component.html',
	styleUrls: ['./mainMenu.component.css']

})
export class MainMenuComponent {
	public customClass: string = 'customClass';
	public isFirstOpen: boolean = false;
	public status: any = {
		isFirstOpen: true,
		isOpen: false
	};

	panelList: Map<string, Array<Panel>> = new Map<string, [Panel]>();
	customList: Array<Custom> = [];
	tmpPanelList: Panel[] = [];
	selectedCustom: Custom;
	curCustomid: string;
	selectedPanel: Panel;
	
	//for primeng
	items: MenuItem[] = [];
	
	public viewPanelList: any = {
		customList: [],
		isOpen: false
	};
	private id_getAccountList: string;

	alarm:Alarm = new Alarm();

	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) {
		comEvent.mComEvent.subscribe((sJson: string) => {

			let rep = JSON.parse(sJson);
			//console.log("action:" + rep['action']);
			if (rep['action'] == "clientgetdomainlist-ack") {
				console.log(sJson);
				if (rep['domainlist'] == null || rep['errorcode'] > 0) {
					return;
				}

				//store domain list informations
				for (let i = 0; i < rep['domainlist'].length; i++) {
					this.mCusomList.setDomain(rep['domainlist'][i]);
				}

				//send getCustomList protocol
				for (let i = 0; i < rep['domainlist'].length; i++) {
					let req = this.cmdPacket.getClientgetcustomlist(rep['domainlist'][i]['domainid']);
					this.ws.doSend(req);
					this.mCusomList.setCurDomainid(rep['domainlist'][i]['domainid']);
					break;
				}
			} else if (rep['action'] == "clientgetcustomlist-ack") {
				
				console.log(rep['customlist']);
				if (rep['customlist'] == null || rep['errorcode'] > 0) {
					return;
				}
				console.log("custom num========" + rep['customlist'].length);
				console.log("customlist========" + sJson);

				//store custom list information
				this.customList = rep['customlist'];
				for (let i = 0; i < rep['customlist'].length; i++) {
					//store data map
					this.mCusomList.setCustom(rep['customlist'][i]);		
					
					//store local 
					//this.items[i] = {"label":"",  command:(this.onSelectCustom), items:[]}; //
					this.items[i] = {"label":"",  command:(event)=>{ this.onSelectCustom(event);}, items:[]}; 
					this.items[i].label = this.customList[i].name;
					this.items[i].icon = this.customList[i].customid;
				}

				//send getDeviceList protocol
				let reqGetDevice = this.cmdPacket.getClientgetdevicelist("");
				this.ws.doSend(reqGetDevice);

				//send getAccountList protocol
				this.id_getAccountList = "";
				let req = this.cmdPacket.getClientgetaccountlist("0", "", "", "", 0);
				this.id_getAccountList = this.cmdPacket.getAnyProtocolID(req);
				console.log("set id_getAccountList:" + this.id_getAccountList);
				this.ws.doSend(req);

			} else if (rep['action'] == "clientgetciddefine-ack") {
				if (rep['cidlist'] == null || rep['errorcode'] > 0) {
					return;
				} for (let i = 0; i < rep['cidlist'].length; i++) {
					this.mCusomList.setCid(rep['cidlist']);
				}

			} else if (rep['action'] == "clientgetdevicelist-ack") {
//				console.log("devicelist========" + sJson);
				if (rep['devicelist'] == null || rep['errorcode'] > 0) {
					return;
				}

				for (let i = 0; i < this.customList.length; i++)
				{
					this.panelList[this.customList[i].customid] = [];
					//console.log(this.panelList);
				}
				let domainid = this.mCusomList.getCurDomainid();

				for (let i = 0; i < rep['devicelist'].length; i++) {
					this.mCusomList.setCustomPanel(rep['devicelist'][i]['customid'], rep['devicelist'][i]);
					
					//let req1 = this.cmdPacket.getClientgetrelaystatus(rep['devicelist'][i]['devicename']);
					//this.ws.doSend(req1);
					//req1 = this.cmdPacket.getClientgetalarm(rep['devicelist'][i]['devicename']);
					//this.ws.doSend(req1);
				}


				let req = this.cmdPacket.getClientgetsubsyslist("");
				this.ws.doSend(req);
				req = this.cmdPacket.getClientgetscenelist("");
				this.ws.doSend(req);
				req = this.cmdPacket.getClientgetzonelist("");
				this.ws.doSend(req);


				//store some information which will be used in mainMenu html
				for (let i = 0; i < this.customList.length; i++)
				{
					this.panelList[this.customList[i].customid] = this.mCusomList.getCustomPanelList(this.customList[i].customid);
					//console.log(this.panelList);

					this.tmpPanelList = [];
					this.tmpPanelList = this.mCusomList.getCustomPanelList(this.customList[i].customid);
					//setItemPanelListByCustom(this.customList[i].customid, this.tmpPanelList);
					for(let k=0; k<this.items.length; k++)
					{
						if(this.customList[i].customid == this.items[k].icon)
						{

							for(let j=0; j<this.tmpPanelList.length; j++)
							{
								//this.items[k].items[j] = {"label":"", command:(this.onSelectPanel)};
								this.items[k].items[j] = {"label":"",  command:(event)=>{ this.onSelectPanel(event);}};
								this.items[k].items[j].label = this.tmpPanelList[j].describe + this.tmpPanelList[j].devicename;
								this.items[k].items[j].icon = this.tmpPanelList[j].devicename;
							}

						}
						
					}	
				}

				//send event to chart component for telling get all device information
				comEvent.mComEvent.emit('{"action":"' + "update-top-chart" + '"}');

			} else if (rep['action'] == "clientgetsubsyslist-ack") {
				//console.log(sJson);
				if (rep['subsyslist'] == null || rep['errorcode'] > 0) {
					// rep['subsyslist'] = new Array<Subsys>();
					// for (let i = 0; i < 12; i++) {
					// 	rep['subsyslist'][i] = new Subsys();
					// 	rep['subsyslist'][i].name = 'subsys' + i;
					// 	rep['subsyslist'][i].status = '0';
					// }
					return;
				}
				//console.log(rep['subsyslist']);
				for (let i = 0; i < rep['subsyslist'].length; i++) {
					this.mCusomList.setCustomPanelSubsys(rep['subsyslist'][i]['devicename'], rep['subsyslist'][i]);
				}
				//let lZonelist:Array<Zone>  = this.mCusomList.getCustomPanelZoneList(rep['devicename']);
			} else if (rep['action'] == "clientgetscenelist-ack") {
				//console.log(sJson);
				if (rep['scenelist'] == null || rep['errorcode'] > 0) {
					return;
				}

				for (let i = 0; i < rep['scenelist'].length; i++) {
					this.mCusomList.setCustomPanelScene(rep['scenelist'][i]['devicename'], rep['scenelist'][i]);
				}
				//let lZonelist:Array<Zone>  = this.mCusomList.getCustomPanelZoneList(rep['devicename']);
			} else if (rep['action'] == "clientgetzonelist-ack") {
				//console.log(sJson);
				if (rep['zonelist'] == null || rep['errorcode'] > 0) {
					return;
				}

				for (let i = 0; i < rep['zonelist'].length; i++) {
					this.mCusomList.setCustomPanelZone(rep['zonelist'][i]['devicename'], rep['zonelist'][i]);
				}
				//let lZonelist: Array<Zone> = this.mCusomList.getCustomPanelZoneList(rep['devicename']);
				//console.log(lZonelist);
			}  else if (rep['action'] == "alarmtoclient" || rep['action'] == "pushalarm") {
				for (let i = 0; i < rep['alarmlist'].length; i++) {
					this.mCusomList.setCustomPanelAlarm(rep['alarmlist'][i]['devicename'], rep['alarmlist'][i]);
					let timeCn = this.alarm.getCovertGMT(rep['alarmlist'][i]['time']);
					comEvent.mComEvent.emit('{"action":"push-alarmMsg","devicename":"' + rep['alarmlist'][i]['devicename'] + '","myinfo":"' + "#" + rep['alarmlist'][i]['alarmid'] + "#" + rep['alarmlist'][i]['customid'] + "#" + this.alarm.getEventID(rep['alarmlist'][i]['eventid'])  + "#" + timeCn + '"}');
				}

				let req = this.cmdPacket.getAlarmtoclientAck();
				this.ws.doSend(req);
			} else if (rep['action'] == "zonechangetoclient") {
				console.log("get push-zoneMsg" + rep);

				for (let i = 0; i < rep['zonelist'].length; i++) {
				let changezone: Map<string, string> = new Map<string, string>();
				changezone['subsysid'] = rep['subsysid'];
				changezone['name'] = rep['zonelist'][i]['name'];
				changezone['zoneid'] = rep['zonelist'][i]['zoneid'];
				changezone['zonetype'] = rep['zonelist'][i]['zonetype'];
				changezone['status'] = rep['zonelist'][i]['status'];
					this.mCusomList.setCustomPanelZone(rep['devicename'], changezone);
				}
				
				comEvent.mComEvent.emit('{"action":"push-zoneMsg","subsysid":"' + rep['subsysid'] +'"}');

				let req = this.cmdPacket.getZonechangetoclientAck();
				this.ws.doSend(req);
			} else if (rep['action'] == "clientgetaccountlist-ack") {
				console.log("set id_getAccountList:" + this.id_getAccountList);
				if (this.id_getAccountList == rep['idack'])
				{
					console.log("@@@@@@get accountlist: length" + rep['accountlist'].length);
					for (let i = 0; i < rep['accountlist'].length; i++) {
						this.mCusomList.setAccount(rep['accountlist'][i]);
					}

					//send event to chart component for telling get all device information
					comEvent.mComEvent.emit('{"action":"' + "getallaccountlist" + '"}');
					console.log("all account:", this.mCusomList);
				}
			} 
			

		})


	}
	onSelectCustom(event): void {
		console.log("=======onSelectCustom======="+event.item.label);
		this.selectedCustom = event.item.label;
		this.mCusomList.setCurCustomid(event.item.icon);
		this.comEvent.mComEvent.emit('{"action":"press-customid"}');
	}
	onSelectPanel(event): void {
		console.log("=======onSelectPanel=======" + event.item.icon);
		this.selectedPanel = event.item.icon;
		this.mCusomList.setCurDeviceName(event.item.icon);
		this.comEvent.mComEvent.emit('{"action":"press-panel"}');

	}

	onTest(): void {
		this.comEvent.mComEvent.emit('{"action":"push-alarmMsg","devicename":"' + 'test device ' + '"}');

	}
}


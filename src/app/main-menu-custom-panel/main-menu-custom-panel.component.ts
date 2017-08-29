import { Component, OnInit } from '@angular/core';


import { WebsocketClient } from '../services/websocket';
import { ComEvent } from '../services/comEvent';
import { CmdPacket } from '../services/cmdPacket';
import { Panel } from '../services/panel';
import { Custom } from '../services/custom';
import { CustomList } from '../services/customList';

//for primeng
import { MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-main-menu-custom-panel',
  templateUrl: './main-menu-custom-panel.component.html',
  styleUrls: ['./main-menu-custom-panel.component.css']
})
export class MainMenuCustomPanelComponent implements OnInit {


	public isFirstOpen: boolean = false;
	public status: any = {
		isFirstOpen: true,
		isOpen: false
	};	
	
	panelList: Map<string, Array<Panel>> = new Map<string, [Panel]>();
	tmpPanelList: Panel[] = [];
	customList: Custom[] = [];
	
	selectedCustom: Custom;
	selectedPanel: Panel;

	//for primeng
	items: MenuItem[] = [];

	curCustomid: string;
	public viewPanelList: any = {
		customList: [],
		isOpen: false
	};

	setItemPanelListByCustom(customid: string, panelList: Panel[]): void {
		for(let k=0; k<this.items.length; k++)
		{
			if(customid == this.items[k].label)
			{
				for(let j=0; j<panelList.length; j++)
				{
					this.items[k].items[j] = {"label":""};
					this.items[k].items[j].label = panelList[j].describe + panelList[j].devicename;
				}
			}
		}	


	}


	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList)
	{ 
		comEvent.mComEvent.subscribe((sJson: string) => {
		let rep = JSON.parse(sJson);
		if (rep['action'] == "update-top-chart" || rep['action'] == "refresh-all-device") {
			for (let i = 0; i < this.customList.length; i++)
			{
				this.panelList[this.customList[i].customid] = [];
			}

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
					if(this.customList[i].customid == this.items[k].label)
					{
						for(let j=0; j<this.tmpPanelList.length; j++)
						{
							this.items[k].items[j] = {"label":""};
							this.items[k].items[j].label = this.tmpPanelList[j].describe + this.tmpPanelList[j].devicename;
						}
					}
				}	

			}

			console.log("******3refresh-all-panelList" + this.panelList);
		}
		else if (rep['action'] == "clientgetcustomlist-ack") {
			this.customList = rep['customlist'];
			this.mCusomList.customList = rep['customlist'];

			//for primeng normal version
			for (let i = 0; i < this.customList.length; i++)
			{
				this.items[i] = {"label":""}; //
				this.items[i].label = this.customList[i].name;
				this.items[i].icon = this.customList[i].customid;
			}
		}
		else if (rep['action'] == "refresh-all-custom")
		{
			console.log("******2refresh-all-custom" + this.customList.length + " " + this.customList);
			this.customList = [];
			//this.customList[0] = {"address":"张江李冰路430","customid":"doppio","name":"保安中心Doppio","telephone":"021-28941444"};
			this.customList = this.mCusomList.customList;
			this.comEvent.mComEvent.emit('{"action":"' + "refresh-all-device" + '"}');
		}
		});

	}

	ngOnInit() {
			//for primeng---- test 
			/*
			let ssJson: string = '{"action":"clientgetcustomlist-ack","idack":"03","errorcode":0,"errormsg":"Succeed","customlist":[{"address":"张江李冰路430","customid":"doppio","name":"保安中心Doppio","telephone":"021-28941444"},{"address":"张江李冰路430","customid":"nbiot","name":"保安中心NBIot","telephone":"021-28941444"},{"address":"上海市浦东李冰路430号","customid":"icbc01","name":"工商银行","telephone":"021-28942011"},{"address":"上海市浦东新区申江路","customid":"User01","name":"个人用户1","telephone":"021-28941333"},{"address":"上海市浦东新区张江高科","customid":"ccb01","name":"建设银行","telephone":"021-28941234"},{"address":"上海市浦东新区广兰路","customid":"kfc01","name":"肯德基","telephone":"021-28941222"}]}';
			let repp = JSON.parse(ssJson);
			this.customList = repp['customlist'];

			for (let i = 0; i < this.customList.length; i++)
			{
				this.items[i] = {"label":""}; 
				this.items[i].label = this.customList[i].name;
			}
			*/
		//,{"address":"张江李冰路430","customid":"nbiot","name":"保安中心NBIot","telephone":"021-28941444"},{"address":"上海市浦东李冰路430号","customid":"icbc01","name":"工商银行","telephone":"021-28942011"},{"address":"上海市浦东新区申江路","customid":"User01","name":"个人用户1","telephone":"021-28941333"},{"address":"上海市浦东新区张江高科","customid":"ccb01","name":"建设银行","telephone":"021-28941234"},{"address":"上海市浦东新区广兰路","customid":"kfc01","name":"肯德基","telephone":"021-28941222"}];
	}
  	onSelectCustom(custom: Custom): void {
		//console.log("=======onSelectCustom======="+hero.customid);
		this.selectedCustom = custom;
		this.mCusomList.setCurCustomid(custom.customid);
		this.comEvent.mComEvent.emit('{"action":"press-customid"}');
	}
	onSelectPanel(panel: Panel): void {
		console.log("=======onSelectPanel=======" + panel.devicename);
		this.selectedPanel = panel;
		this.mCusomList.setCurDeviceName(panel.devicename);
		this.comEvent.mComEvent.emit('{"action":"press-panel"}');

	}

	


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//test for panel view
import { MenuItem } from 'primeng/primeng';

import { WebsocketClient } from '../services/websocket';
import { ComEvent } from '../services/comEvent';
import { CmdPacket } from '../services/cmdPacket';
import { CustomList } from '../services/customList';

import { DeviceMapIfno } from '../services/deviceMapInfo';
import { Domain} from '../services/domain';
import {SelectItem} from 'primeng/primeng';



declare var $: any;

  @Component({
	moduleId: module.id,
	selector: 'sel-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	deviceMapInfoList: DeviceMapIfno[] = [];
	test:string[] = [];
	domainList: Domain[] =[];

	data: any;

    types: SelectItem[];

	selectedType: string;

	bindName: string = "client0";
	bindPassword: string = "123456";

	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) {
		ws.mOnMsg.subscribe((sJson: string) => {

			let rep = JSON.parse(sJson);
			if (rep['action'] == 'onOpenWs-ack') {
				this.mCusomList.opername = this.bindName;
				this.mCusomList.pwd = this.bindPassword;
				let req = this.cmdPacket.getLogin(this.mCusomList.opername, this.mCusomList.pwd);
				this.ws.doSend(req);
			} else {
				//console.log("Recv: ", sJson);
				comEvent.mComEvent.emit(sJson);
			}
		})
	}

	ngOnInit() {
		this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#1E88E5',
                    borderColor: '#e31616',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#7CB342',
                    borderColor: '#000000',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
		}
  	}

	onSubmit()
	{
		console.log("===###");
		this.ws.InitWs(this.bindName, this.bindPassword);
		console.log("name:" + this.bindName + "password:" + this.bindPassword);
		//this.ws.InitWs("client2", "123456");
	}
}

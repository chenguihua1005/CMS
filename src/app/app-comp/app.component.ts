import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { WebsocketClient } from '../services/websocket';
import { ComEvent } from '../services/comEvent';
import { CmdPacket } from '../services/cmdPacket';

@Component({
	moduleId: module.id,
	selector: 'sel-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']

})
export class AppComponent {
	public customClass: string = 'customClass';
	public isFirstOpen: boolean = false;
	public sPage: string;
	showDialog: boolean = false;
	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket) {
		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			if (rep['action'] == "login-ack") {
				if (rep['errorcode'] == 0) {
					this.sPage = "sel-home";
					document.body.style.backgroundImage = 'none';

					let req = this.cmdPacket.getClientgetdomainlist();
					this.ws.doSend(req);

					setInterval(() => {
						let req = this.cmdPacket.getHeartbeat();
						this.ws.doSend(req);
					}, 10000);
				} else {
					alert("login-ack网络连接失败");
				}
			} else if (rep['action'] == "dialog-editZone") {
				this.showDialog = true;
			} else if (rep['action'] == "logout") {
				this.sPage = "sel-login";
			}

		})
		this.sPage = "sel-login";
	}
	//ngOnInit(): void {

	//this.router.navigate(['/home']);
	//console.log("====!!!");
	//}
	//	 title = 'app works===!';
}
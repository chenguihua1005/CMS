import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ComEvent } from '../services/comEvent';

@Component({
	moduleId: module.id,
	selector: 'sel-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
	public sPage: string;


	constructor(private comEvent: ComEvent) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			if (rep['action'] == "top-panel") {
				this.sPage = "demo-section";
				this.comEvent.mComEvent.emit('{"action":"' + "main-menu-custom-panel" + '"}');
			} else if (rep['action'] == "top-map") {
				this.sPage = "app-baiduMap";
			} else if (rep['action'] == "top-query") {
				this.sPage = "top-query";
			} else if (rep['action'] == "top-edit") {
				this.sPage = "top-edit";
				comEvent.mComEvent.emit('{"action":"clientgetaccountlist-ui-show"}');
			} else if(rep['action'] == "top-chart") {
				this.sPage = "top-chart";
			}


		});
		this.sPage = "top-chart";
		//this.sPage = "top-edit";


	}

	ngOnInit(): void {
		//console.log("====!!!");
	}


}
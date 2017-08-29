import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Alarm {
	public customid:string;
	public devicename: string;
	public account: string;
	public subsysid: string;
	public cccid: string;
	public eventid: string;
//	public cid: string;
	public descn: string;
	public desen: string;
	public time: string;
	public comments: string;
	public actionstate: number;

	constructor() {

	}
	public getEventID(eventNum: string): string {

		let eventIDType = eventNum.substring(0, 1);
		let eventIDNum = eventNum.substring(1, 4);

		if ("1" == eventIDType)
		{
			eventIDType = "E";
		}
		else if ("3" == eventIDType)
		{
			eventIDType = "R";
		}
		else
		{
			return "EventID Error";
		}

		return eventIDType + eventIDNum;
	}
	
	public getCovertGMT(gmtTime: string){
		var date = new Date(gmtTime.replace("T"," "));
		return date.toLocaleString();
	}
	
	public setAlarm(descn: string, sJson: any): void {
		this.customid = sJson['customid'];
		this.devicename = sJson['devicename'];
		this.account = sJson['account'];
		this.subsysid = String(sJson['subsysid']);
		this.cccid = String(sJson['cccid']);
		this.eventid =String(sJson['eventid']);
		this.descn = "cncncn";
		this.desen = "enenen";		
		this.actionstate = sJson['actionstate'];
		this.comments = sJson['comments'];
		this.time = this.getCovertGMT(sJson['time']);
	}
}
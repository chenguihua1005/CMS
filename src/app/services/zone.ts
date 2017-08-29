import { Component, Injectable, EventEmitter } from '@angular/core';
import { Const } from './const';
@Injectable()
export class Zone {
	public subsysid: number;
	public zoneid: number;
	public name: string;
	public zonetype: number;
	public status: string;
	public checked: boolean;
	public nzonetype:string;
	public password:number;
    public nConst = new Const();
	constructor() {

	}

    public getZoneType(type: number): string {
		return this.nConst.getZoneType(type);
	}
	public getZoneStatus(status: string): string {
		return this.nConst.getZoneStatus(status);
	}
	public setZone(sJson: any): void {
		this.subsysid = sJson['subsysid'];
		this.zoneid = sJson['zoneid'];
		this.name = sJson['name'];
		this.nzonetype =this.getZoneType(sJson['zonetype']);
		this.status =this.getZoneStatus(sJson['status']);
	}

}


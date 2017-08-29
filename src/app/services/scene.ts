import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Scene {
	public subsysid: number;
	public sceneid: number;
	public name: string;
	public status: string;
	public checked: boolean;
	constructor() {

	}
	public setScene(sJson: any): void {
		this.subsysid = sJson['subsysid'];
		this.sceneid = sJson['sceneid'];
		this.name = sJson['name'];
		this.status = sJson['status'];
		if (this.status == "1") {
			this.checked = true;
		} else {
			this.checked = false;
		}
	}
}
//{"name":"scenename-8-1-19","sceneid":19,"status":"0"}

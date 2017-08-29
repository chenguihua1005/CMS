import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Subsys {
	public subsysid: number;
	public name: string;
	public status: string;
	public checked: boolean = false;

	constructor() {

	}
	public setSubsys(sJson: any): void {
		this.subsysid = sJson['subsysid'];
		this.name = sJson['name'];
		this.status = sJson['status'];
	}
}
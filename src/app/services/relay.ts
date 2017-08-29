import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Relay {
	public name: string;
	public status:string;
    public checked:boolean;

	constructor() {

	}
	public setRelay(sJson: any): void {
		this.name = sJson['name'];
		this.status = sJson['status'];
	}
}
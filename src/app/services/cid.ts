import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Cid {
	public customid: string;
	public cid:string;
    public descn:string;
    public desen:string;
    public checked:boolean;

	constructor() {
		
	}
	public setCid(sJson: any):void{
		this.customid = sJson['customid'];
		this.cid = sJson['cid'];
		this.descn = sJson['descn'];
		this.desen = sJson['desen'];
	}
}


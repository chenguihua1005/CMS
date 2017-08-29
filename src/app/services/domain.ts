import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Domain {

    public describe:string;
    public domainid:string;
    public duetime:string;
    public enabled:boolean;
    public name:string;
    public registertime:number;

    public checked:boolean;
//"domainlist":[{"describe":"上海市李冰路430号","domainid":"0","duetime":0,"enabled":true,"name":"霍尼韦尔","registertime":0}]}
	constructor() {

	}
	public setDomain(sJson: any): void {

		this.describe = sJson['describe'];
		this.domainid = sJson['domainid'];
		this.duetime = sJson['duetime'];
		this.enabled = sJson['enabled'];
		this.name = sJson['name'];	
		this.registertime = sJson['registertime'];

	}
}

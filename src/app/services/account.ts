import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Account {
	public cidtype: string;
	public customid: string;
    public describe: string;
    public duetime: string;
    public enabled: boolean;
    public lastlogintime: number;
    public name: string;
    public online: boolean;
    public password: string;
    public registertime: number;
    public rolename: string;
    public type: string;
    public version: string;
    public x: number;
    public y: number;
    public checked: boolean;

	constructor() {
		
	}
	public setAccount(sJson: any): void {
		this.cidtype = sJson['cidtype'];
		this.customid = sJson['customid'];
		this.describe = sJson['describe'];
		this.duetime = sJson['duetime'];
		this.enabled = sJson['enabled'];
		this.lastlogintime = sJson['lastlogintime'];
		this.name = sJson['name'];
		this.online = sJson['online'];
		this.password = sJson['password'];
		this.registertime = sJson['registertime'];
		this.rolename = sJson['rolename'];
		this.type = sJson['type'];
		this.version = sJson['version'];
		this.x = sJson['x'];
		this.y = sJson['y'];
	}

	public setAccountByAccount(tAccount: Account): void {
		this.cidtype = tAccount.cidtype;
		this.customid = tAccount.customid;
		this.describe = tAccount.describe;
		this.duetime = tAccount.duetime;
		this.enabled = tAccount.enabled;
		this.lastlogintime = tAccount.lastlogintime;
		this.name = tAccount.name;
		this.online = tAccount.online;
		this.password = tAccount.password;
		this.registertime = tAccount.registertime;
		this.rolename = tAccount.rolename;
		this.type = tAccount.type;
		this.version = tAccount.version;
		this.x = tAccount.x;
		this.y = tAccount.y;
	}

}

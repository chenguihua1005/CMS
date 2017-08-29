import { Component, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DeviceMapIfno {
	public deviceName:string;
	public lnglat: number[];
    public deviceAddress: string;

	constructor() {

	}
	public setDeviceMapIfno(deviceName: string, lnglat: number[], deviceAddress:string): void {
		this.deviceName = deviceName;
		this.lnglat = lnglat;
		this.deviceAddress = deviceAddress;
	}
}
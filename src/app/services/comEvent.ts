import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ComEvent {
	mComEvent: EventEmitter < string> ;
	constructor() {
		this.mComEvent = new EventEmitter();
	}
}
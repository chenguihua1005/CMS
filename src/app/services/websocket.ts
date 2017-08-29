
import {Component,Injectable,EventEmitter} from '@angular/core';

@Injectable()
export class WebsocketClient {
	 output: any;
	 websocket: any;
	 wsUri:string;
	 mUserName:string;
	 mPassword: string;
	 mOnMsg: EventEmitter<string>;
	constructor() {
		this.wsUri = "ws://101.231.98.163:8132/Cms";
		// this.wsUri = "ws://122.152.207.150:8332/Cms";
		//this.wsUri = "ws://139.196.115.69:833/Cms";
		//this.wsUri = "ws://10.10.10.3:833/Cms";
		// test address wss://101.231.98.163:8133/Cms
		//this.wsUri = "wss://101.231.98.163:8133/Cms"; /*security*/
		this.mOnMsg = new EventEmitter();
		
	}
	
	InitWs(sUserName:string,sPassword:string): void {
		this.mUserName = sUserName;
		this.mPassword = sPassword;
		this.websocket = new WebSocket(this.wsUri);
		
		var ctx =  this;
		this.websocket.onopen = function(evt) {
			ctx.onOpen(evt);
		};
		this.websocket.onclose = function(evt) {
			ctx.onClose(evt);
			
		};
		this.websocket.onmessage = function(evt) {
			
			ctx.onMessage(evt);
			
		};
		this.websocket.onerror = function(evt) {
			ctx.onError(evt);
		};
		
	}

	private onOpen(evt: any): void {
		this.writeToScreen("CONNECTED");		
		this.mOnMsg.emit('{"action":"onOpenWs-ack"}');

	}

	private onClose(evt: any): void{ 
		//alert("网络连接失败onClose");
		this.writeToScreen("DISCONNECTED");
	}

	private onMessage(evt: any): void{
		//console.log("=====onmessage=====",evt.data);
		this.mOnMsg.emit(evt.data);
		//this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');

	}

	private onError(evt: any): void{ 
		alert("网络连接失败onError");
		this.mOnMsg.emit('{"action":"logout"}');
		var req = '{"action":"login","version":"1.4","clienttype":"2200", "clientversion":"12", "clientdescribe":"RoadLibing", "username":"'+ this.mUserName+'","password":"'+this.mPassword+'","token":"Token-usr000",id":"0"}';
		this.doSend(req);
		this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
	}
	public doSend(message: any): void{
		this.writeToScreen("SENT: " + message);
		this.websocket.send(message);
	}

	public writeToScreen(message: any) : void{
		console.log(message);
		//var pre = document.createElement("p");
		//pre.style.wordWrap = "break-word";
		//pre.innerHTML = message;
		//output.appendChild(pre);
	}
}
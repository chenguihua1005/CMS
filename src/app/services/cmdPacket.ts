import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CmdPacket {
	id:number = 0;

	mCmdPacket: EventEmitter<string>;
	private Login: any = {
		action: "login",
		version: 14,
		clienttype: 2200,
		clientversion: 12,
		clientdescribe:"Road Libing",
		username: "",
		password: "",
		token: "Token-usr000",
		language: "cn",
		id: "0"
	};
	private Heartbeat: any = {
		action: "heartbeat",
		id: "0"
	};
	private Clientgetdomainlist: any = {
		action: "clientgetdomainlist",
		id: "0"
	};
	private Clientgetcustomlist: any = {
		action: "clientgetcustomlist",
		id: "0"
	};
	private Clientgetdevicelist: any = {
		action: "clientgetdevicelist",
		customid: "",
		id: "0"
	}
	private Clientgetsubsyslist: any = {
		action: "clientgetsubsyslist",
		devicename: "",
		id: "0"
	}
	private Clientgetscenelist: any = {
		action: "clientgetscenelist",
		devicename: "",
		subsysid: 0,
		id: "0"
	}
	private Clientgetzonelist: any = {
		action: "clientgetzonelist",
		devicename: "",
		subsysid: 0,
		id: "0"
	}
	private Clientgetalarm: any = {
		action: "clientgetalarm",
		id: "0",
		devicename: "",
		startalarmid: 0,
		limit: 70
	}

	private Clientdeleteaccount: any = {
		action: "clientdeleteaccount",
		id: this.getNewID(),
		domainid: "",
		name: ""
	}

	private Clientsetaccount: any = {
		action: "clientsetaccount",
		id: this.getNewID(),
		domainid: "",
		name: "",
		password: "",
		type: 0,
		describe: "",
		duetime: "",
		enabled: 1
	}

	private Clientnewaccount: any = {
		action: "clientsetaccount",
		id: this.getNewID(),
		domainid: "",
		name: "",
		password: "",
		type: 0,
		describe: "",
		duetime: "",
		enabled: 1
	}

	private AlarmtoclientAck: any = {
		action: "alarmtoclient-ack",
		idack: "0",
		errorcode: 0,
		errormsg: "成功"
	}
	private ZonechangetoclientAck: any = {
		action: "zonechangetoclient-ack",
		idack: "0",
		errorcode: 0,
		errormsg: "成功"
	}
	private Clientgetoperdevice: any = {
		action: "clientgetoperdevice",
		id: "0",
		customid: "",
		type: "all"
	}
	private Clientgetaccountlist: any = {
		action: "clientgetaccountlist",
		id: this.getNewID(),
		domainid: "",
		customid: "",
		opername: "",
		name: "",
		type: 0
	}

	private Clientgetrelaystatus: any = {
		action: "clientgetrelaystatus",
		devicename: "",
		id: "0",
	}
	private Clientgetciddefine: any = {
		action: "clientgetciddefine",
		customid: "",
		id: "0",
	}

	private ClientBindDeviceOper: any = {
		action: "clientbinddeviceoper",
		id: this.getNewID(),
		devicename: "",
		opername: "",
		bind: 1
	}

	private ClientUnbindDeviceOper: any = {
		action: "clientbinddeviceoper",
		id: this.getNewID(),
		devicename: "",
		opername: "",
		bind: 0
	}

	private ClientBindDeviceCustom: any = {
		action: "clientbinddevicecustom",
		id: this.getNewID(),
		devicename: "",
		customid: "",
		bind: 1
	}

	private ClientUnbindDeviceCustom: any = {
		action: "clientbinddevicecustom",
		id: this.getNewID(),
		devicename: "",
		customid: "",
		bind: 0
	}

	private ClientOperList: any = {
		action: "clientgetaccountlist",
		id: this.getNewID(),
		domainid: "",
		customid: "",
		opername: "",
		name: "",
		type: 2
	}	

	private ClientBoundDeviceByOper: any = {
		action: "clientgetaccountlist",
		id: this.getNewID(),
		domainid: "",
		customid: "",
		opername: "",
		name: "",
		type: 1
	}

	private ClientUnboundDeviceByOper: any = {
		action: "clientgetaccountlist",
		id: this.getNewID(),
		domainid: "",
		customid: "",
		opername: "unbound",
		name: "",
		type: 1
	}

	private ClientBoundDeviceByCustom: any = {
		action: "clientgetaccountlist",
		id: this.getNewID(),
		domainid: "",
		customid: "",
		opername: "",
		name: "",
		type: 1
	}

	private ClientUnboundDeviceByCustom: any = {
		action: "clientgetaccountlist",
		id: this.getNewID(),
		domainid: "",
		customid: "unbound",
		opername: "",
		name: "",
		type: 1
	}
	private Clienttransit: any = {
		action: "transit",
		//client: "nbiot01",
		client: "",
		id: this.getNewID(),
		data: ""
	}
    private ClienttransitJson: any = {
		action: "ctrlzone",
		subsysid:"",
		zoneid:"",
		op:2,
		opuser:"011234",
		id:""
		
	}
	constructor() {
		this.mCmdPacket = new EventEmitter();
	}
	gettransitdata(sSubid: number,sZoneID: number,client:string): string {
		this.ClienttransitJson.subsysid =sSubid;
		this.ClienttransitJson.zoneid = sZoneID;
        this.Clienttransit.client =client;
		this.Clienttransit.data =this.ClienttransitJson;
		return JSON.stringify(this.Clienttransit);
	}
	getNewID(): string {
		let sID:string = String(++this.id);
		return sID ;
	}

	getLogin(sUsername: string, sPassword: string): string {
		this.Login.username = sUsername;
		this.Login.password = sPassword;
		//console.log("==!!!==="+JSON.stringify(this.Login));
		return JSON.stringify(this.Login);
	}

	getClientDeleteAccount(sDomainid:string, sName:string): string {
		this.Clientdeleteaccount.domainid = sDomainid;
		this.Clientdeleteaccount.name = sName;
		return JSON.stringify(this.Clientdeleteaccount);
	}


	getClientSetAccount(sDomainid:string, sName:string, sPassword:string, sType:number, sDescribe:string, sDuetime:string, sEnabled:boolean): string {
		this.Clientsetaccount.domainid = sDomainid;
		this.Clientsetaccount.name = sName;
		this.Clientsetaccount.password = sPassword;
		this.Clientsetaccount.type = sType;
		this.Clientsetaccount.describe = sDescribe;
		this.Clientsetaccount.duetime = sDuetime;
		this.Clientsetaccount.enabled = sEnabled;
		return JSON.stringify(this.Clientsetaccount);
	}

	getClientNewAccount(sDomainid:string, sName:string, sPassword:string, sType:number, sDescribe:string, sDuetime:string, sEnabled:boolean): string {
		this.Clientnewaccount.domainid = sDomainid;
		this.Clientnewaccount.name = sName;
		this.Clientnewaccount.password = sPassword;
		this.Clientnewaccount.type = sType;
		this.Clientnewaccount.describe = sDescribe;
		this.Clientnewaccount.duetime = sDuetime;
		this.Clientnewaccount.enabled = sEnabled;

		return JSON.stringify(this.Clientnewaccount);
	}

	getHeartbeat(): string {
		return JSON.stringify(this.Heartbeat);
	}
	getClientgetdomainlist(): string {
		return JSON.stringify(this.Clientgetdomainlist);
	}
	getClientgetcustomlist(domainid: string): string {
		this.Clientgetcustomlist.domainid = domainid;
		return JSON.stringify(this.Clientgetcustomlist);
	}
	getClientgetciddefine(sCustomid: string): string {
		this.Clientgetciddefine.customid = sCustomid;
		return JSON.stringify(this.Clientgetciddefine);
	}
	getClientgetdevicelist(sCustomid: string): string {
		this.Clientgetdevicelist.customid = sCustomid;
		return JSON.stringify(this.Clientgetdevicelist);
	}
	getClientgetsubsyslist(sDevicename: string): string {
		this.Clientgetsubsyslist.devicename = sDevicename;
		return JSON.stringify(this.Clientgetsubsyslist);
	}
	getClientgetscenelist(sDevicename: string): string {
		this.Clientgetscenelist.devicename = sDevicename;
		return JSON.stringify(this.Clientgetscenelist);
	}
	getClientgetzonelist(sDevicename: string): string {
		this.Clientgetzonelist.devicename = sDevicename;
		return JSON.stringify(this.Clientgetzonelist);
	}
	getClientgetrelaystatus(sDevicename: string): string {
		this.Clientgetrelaystatus.devicename = sDevicename;
		return JSON.stringify(this.Clientgetrelaystatus);
	}
	getClientgetalarm(sDevicename: string): string {
		this.Clientgetalarm.devicename = sDevicename;
		return JSON.stringify(this.Clientgetalarm);
	}
	getAlarmtoclientAck(): string {
		return JSON.stringify(this.AlarmtoclientAck);
	}
	getZonechangetoclientAck(): string {
		return JSON.stringify(this.ZonechangetoclientAck);
	}
	getClientgetoperdevice(customid: string): string {
		return JSON.stringify(this.Clientgetoperdevice);
	}
	getClientgetaccountlist(domainid: string, customid: string, opername: string, name: string, type: number): string {
		this.Clientgetaccountlist.domainid = domainid;
		this.Clientgetaccountlist.customid = customid;
		this.Clientgetaccountlist.opername = opername;
		this.Clientgetaccountlist.name = name;
		this.Clientgetaccountlist.type = type;
		return JSON.stringify(this.Clientgetaccountlist);
	}

	getClientgetoperlist(domainid: string): string {
		this.Clientgetaccountlist.domainid = domainid;
		this.Clientgetaccountlist.customid = "";
		this.Clientgetaccountlist.opername = "";
		this.Clientgetaccountlist.name = "";
		this.Clientgetaccountlist.type = 2;
		return JSON.stringify(this.Clientgetaccountlist);
	}

	getClientgetoperbounddevicelist(domainid: string, opername: string): string {
		this.Clientgetaccountlist.domainid = domainid;
		this.Clientgetaccountlist.customid = "";
		this.Clientgetaccountlist.opername = opername;
		this.Clientgetaccountlist.name = "";
		this.Clientgetaccountlist.type = 1;
		return JSON.stringify(this.Clientgetaccountlist);
	}

	getClientgetoperunbounddevicelist(domainid: string): string {
		this.Clientgetaccountlist.domainid = domainid;
		this.Clientgetaccountlist.customid = "";
		this.Clientgetaccountlist.opername = "unbound";
		this.Clientgetaccountlist.name = "";
		this.Clientgetaccountlist.type = 1;
		return JSON.stringify(this.Clientgetaccountlist);
	}

	getAnyProtocolID(sJson: string): string {
		let rep = JSON.parse(sJson);

		let id : string = rep ['id'];

		return id;
	}

	getOperatorList(domainid:string): string {
		this.ClientOperList.domainid = domainid;
		return JSON.stringify(this.ClientOperList);	
	}

	getBindDeviceOper(devicename: string, opername: string): string {
		this.ClientBindDeviceOper.devicename = devicename;
		this.ClientBindDeviceOper.opername = opername;
		return JSON.stringify(this.ClientBindDeviceOper);
	}

	getUnBindDeviceOper(devicename: string, opername: string): string {
		this.ClientUnbindDeviceOper.devicename = devicename;
		this.ClientUnbindDeviceOper.opername = opername;
		return JSON.stringify(this.ClientUnbindDeviceOper);
	}

	getBoundDeviceByOper(domainid: string, opername: string): string {
		this.ClientBoundDeviceByOper.domainid = domainid;
		this.ClientBoundDeviceByOper.opername = opername;
		return JSON.stringify(this.ClientBoundDeviceByOper);
	}

	getUnBoundDeviceByOper(domainid: string): string {
		this.ClientUnboundDeviceByOper.domainid = domainid;
		return JSON.stringify(this.ClientUnboundDeviceByOper);
	}

	getBindDeviceCustom(devicename: string, customid: string): string {
		this.ClientBindDeviceCustom.devicename = devicename;
		this.ClientBindDeviceCustom.customid = customid;
		return JSON.stringify(this.ClientBindDeviceCustom);
	}

	getUnBindDeviceCustom(devicename: string, customid: string): string {
		this.ClientUnbindDeviceCustom.devicename = devicename;
		this.ClientUnbindDeviceCustom.customid = customid;
		return JSON.stringify(this.ClientUnbindDeviceCustom);
	}

	getBoundDeviceByCustom(domainid: string, customid: string): string {
		this.ClientBoundDeviceByCustom.domainid = domainid;
		this.ClientBoundDeviceByCustom.customid = customid;
		return JSON.stringify(this.ClientBoundDeviceByCustom);
	}

	getUnBoundDeviceByCustom(domainid: string): string {
		this.ClientUnboundDeviceByCustom.domainid = domainid;
		return JSON.stringify(this.ClientUnboundDeviceByCustom);
	}
}




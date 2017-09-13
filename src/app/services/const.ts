import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Const {
	public mCidMap: Map<string, string> = new Map<string, string>();

	constructor() {

	}
	public getZoneStatus(status: string): string {
		let s:string;
		if (status.length < 5) {
			return "";
			
		} 
		if (status[0] == '1') {
			//return "报警";
			s =  "报警/";
		} else{
			s =  "正常/";
		}
		 if (status[1] == '1') {
			s = s + "故障/";
		} 
	
		 if (status[2] == '1') {
			s = s + "被拆/";
		} 
		 if (status[3] == '1') {
			s = s + "旁路/";
		} 
		 if (status[4] == '1') {
			s = s + "触发/";
		} 
		 if (status[5] == '1') {
			s = s + "布防";
		}
		else{
			s = s + "撤防";
		}
		return s;

	}
	public getCidParse(cid: string): string {
		let account = cid.substring(0, 4);
		let restore = cid.substring(6, 7);
		let event = cid.substring(7, 10);
		let subsys = cid.substring(10, 12);
		let zoneid = cid.substring(12, 15);
		if (restore == "3") {
			restore = "恢复";
		} else {
			restore = "";
		}
		return "账号" + account + ",子系统" + subsys + ",防区" + zoneid + ",事件：" + event + " " + restore;
	}
	public getZoneType(type: number): string {
		switch (type) {
			case 1:
				return "延时防区";
			case 2:
				return "即时防区";
			case 3:
				return "24小时防区";
			case 4:
				return "24小时匪警";
			case 5:
				return "24小时火警";
			case 6:
				return "遥控器";
			case 7:
				return "24小时烟雾";
			case 8:
				return "24小时可燃气体(天燃气)";
			default:
				return "未知类型";
		}

	}
}


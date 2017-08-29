import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Alarm } from '../services/alarm';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import { CmdPacket } from '../services/cmdPacket';
import { WebsocketClient } from '../services/websocket';

@Component({
	moduleId: module.id,
	selector: 'alarm-table',
	templateUrl: './alarmTable.component.html',
	styleUrls: ['./alarmTable.component.css']

})
export class AlarmTableComponent {
	public totalItems: number = 0;
	public currentPage: number = 1;

	public alarmListData: Array<Alarm> = [];
	public mDevicename: string = "";
	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket,  private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			//console.log("========================"+rep['action']);
			//console.log(sJson);
			if (rep['action'] == "push-alarmMsg") {

				this.mDevicename = this.mDevicename = this.mCusomList.getCurDeviceName();
				if (this.mDevicename == rep['devicename']) {
					this.alarmListData = [...this.mCusomList.getCustomPanelAlarmList(this.mDevicename)];
					//this.alarmListData = [...this.mCusomList.getCustomPanelAlarmList(rep['devicename'])];
					this.totalItems = this.alarmListData.length;
					//console.log("#alarmTable##push-alarmMsg###" + this.mDevicename);
					//type map to string
					//this.parseType();
				}
			} else if (rep['action'] == "clientgetalarm-alarmMsg") {
				//console.log("#alarmTable##clientgetalarm-alarmMsg###" + rep['devicename']);
				//				this.mDevicename = rep['devicename'];
				//				this.alarmListData = this.mCusomList.getCustomPanelAlarmList(this.mDevicename);
				//				this.totalItems = this.alarmListData.length; 
				//				this.alarmList = [];
				//				for(let i = 0; i < 10; i++) {
				//					if(i < this.alarmListData.length){
				//					 	this.alarmList[i] = this.alarmListData[i];
				//					}
				//				}
			} else if (rep['action'] == "press-panel") {
				
				this.mDevicename = this.mCusomList.getCurDeviceName();
				console.log("press-panel:" + this.mDevicename);

				let req1 = this.cmdPacket.getClientgetalarm(this.mDevicename);
				this.ws.doSend(req1);
				
			}else if (rep['action'] == "clientgetalarm-ack") {
				//console.log("clientgetalarm-ack***********");
				if (rep['alarmlist'] == null || rep['errorcode'] > 0) {
					return;
				}
				for (let i = 0; i < rep['alarmlist'].length; i++) {
					this.mCusomList.setCustomPanelAlarm(rep['alarmlist'][i]['devicename'], rep['alarmlist'][i]);

				}
				this.alarmListData = this.mCusomList.getCustomPanelAlarmList(this.mDevicename);
				this.totalItems = this.alarmListData.length;
				//type map to string
				//this.parseType();
				console.log("#alarmTable##press-panel:"+ this.mDevicename +"###====="+ this.totalItems);
				//comEvent.mComEvent.emit('{"action":"clientgetalarm-alarmMsg","devicename":"'+rep['alarmlist'][0]['devicename']+'"}');	
				//let lAlarmlist:Array<Alarm>  = this.mCusomList.getCustomPanelAlarmList('device0');
				//console.log(lAlarmlist);
			}

		});

	}

	ngOnInit() {

		this.mDevicename = this.mCusomList.getCurDeviceName();
		this.alarmListData = this.mCusomList.getCustomPanelAlarmList(this.mDevicename);
		this.totalItems = this.alarmListData.length;
	}

	parseType() {
		for(let data of this.alarmListData) {
			data.eventid = this.getTypeStringByTypeID(parseInt(this.getEventID(data.eventid)));
		}
	}

	public getCovertGMT(gmtTime: string){
		var date = new Date(gmtTime.replace("T"," "));
		return date.toLocaleString();
	}

	public getTypeStringByTypeID(tType : number): string {
		switch (tType) {
			case 1001:
				return "频繁连接";
			case 1002:
				return "端口扫描";
			case 1100:
				return "医疗救护";
			case 1101:
				return "个人急救";
			case 1110:
				return "火警";
			case 1111:
				return "烟感报警";
			case 1112:
				return "燃烧报警";
			case 1113:
				return "水满报警";
			case 1114:	
				return "过热报警";
			case 1120:
				return "紧急报警";
			case 1121:
				return "劫持报警";
			case 1122:
				return "无声报警";
			case 1123:
				return "有声报警";
			case 1124:
				return "挟持(允许进入)";
			case 1125:
				return "挟持(允许外出)";
			case 1130:
				return "盗警";
			case 1131:
				return "周边盗警";
			case 1132:
				return "内部盗警";
			case 1133:
				return "24小时盗警";
			case 1134:
				return "出入盗警";
			case 1135:
				return "日夜盗警";
			case 1136:
				return "室外盗警";
			case 1137:
				return "防拆盗警";
			case 1138:
				return "接近报警";
			case 1139:
				return "入侵验证";
			case 1140:
				return "一般报警";
			case 1141:
				return "轮询回路开路";
			case 1142:
				return "轮询回路短路";
			case 1143:
				return "扩展模块故障";
			case 1144:
				return "传感器防拆报警";
			case 1145:
				return "扩展模块防拆报警";
			case 1146:
				return "无声盗警";
			case 1147:
				return "传感器监控故障";
			case 1150:
				return "24小时辅助报警";
			case 1151:
				return "瓦斯外泄";
			case 1152:
				return "制冷报警";
			case 1153:
				return "热损失报警";
			case 1154:
				return "漏水报警";
			case 1155:
				return "屏蔽失效";
			case 1156:
				return "白天故障";
			case 1157:
				return "罐装液化气气压低";
			case 1158:
				return "温度过高";
			case 1159:
				return "温度过低";
			case 1161:
				return "气流损耗";
			case 1162:
				return "一氧化碳泄漏";
			case 1163:
				return "罐内液面";
			case 1200:
				return "火灾监控";
			case 1201:
				return "水压过低";
			case 1202:
				return "CO2含量过低";
			case 1203:
				return "闸阀传感器报警";
			case 1204:
				return "水位过低";
			case 1205:
				return "泵启动";
			case 1206:
				return "泵故障";
			case 1301:
				return "交流掉电";
			case 1302:
				return "系统电池电压低";
			case 1305:
				return "系统重新设定(主机重启)";
			case 1306:
				return "主机进入编程状态";	
			case 1308:
				return "关闭主机";
			case 1309:
				return "电池测试失败";
			case 1310:
				return "接地失效";
			case 1313:
				return "系统工程师复位";
			case 1320:
				return "门禁控制系统继电器监控";
			case 1321:
				return "警号保险丝报警";
			case 1332:
				return "总线回路短路故障";	
			case 1333:
				return "警号保险丝报警";
			case 1338:
				return "模块电池电压低";
			case 1339:
				return "ACS模块复位";
			case 1341:
				return "模块防拆报警";
			case 1342:
				return "模块交流掉电";
			case 1343:
				return "ACS模块自测失败";
			case 1344:
				return "无线通信模块工作信号差";	
			case 1350:
				return "网络通讯故障";
			case 1351:
				return "主机电话线断线";
			case 1352:
				return "备份拨号器故障";
			case 1353:
				return "模块与主机通信故障";
			case 1354:
				return "主机通讯失败";
			case 1373:
				return "火警回路故障";
			case 1374:
				return "防区退出错误";	
			case 1378:
				return "交叉防区故障";
			case 1380:
				return "防区故障";
			case 1381:
				return "(RF)监控丢失";
			case 1382:
				return "RPM监控丢失";
			case 1383:
				return "防区防拆";
			case 1384:
				return "无线发射器电池电压低";
			case 1385:
				return "高灵敏度维修信号";	
			case 1386:
				return "低灵敏度维修信号";
			case 1389:
				return "探测器自测失败";
			case 1400:
				return "撤防";
			case 1401:
				return "用户撤防";
			case 1402:
				return "组撤防";
			case 1403:
				return "自动撤防";	
			case 1406:
				return "用户取消操作";
			case 1407:
				return "遥控撤防";
			case 1408:
				return "快速布防";
			case 1409:
				return "布撤防锁撤防";
			case 1411:
				return "请求回叫";
			case 1421:
				return "访问被拒";
			case 1422:
				return "访问允许";
			case 1423:
				return "强制撤防门";
			case 1424:
				return "外出被拒";
			case 1425:
				return "外出允许";
			case 1426:
				return "正常布防门";
			case 1427:
				return "门禁点DSM故障";
			case 1428:
				return "门禁点RTE故障";	
			case 1429:
				return "门禁控制系统设置进入";
			case 1430:
				return "门禁控制系统设置外出";
			case 1431:
				return "门禁控制系统威胁状况改变";
			case 1432:
				return "门禁点继电器/触发器失败";
			case 1433:
				return "门禁点RTE旁路";
			case 1434:
				return "门禁点DSM旁路/取消旁路";
			case 1441:
				return "留守撤防";
			case 1442:
				return "布撤防锁留守撤防";
			case 1451:
				return "撤防过早";
			case 1452:
				return "撤防过迟";
			case 1453:
				return "撤防失败";
			case 1454:
				return "布防失败";
			case 1455:
				return "自动布防失败";	
			case 1456:
				return "局部撤防";
			case 1457:
				return "用户外出错误";
			case 1459:
				return "近期布防";
			case 1501:
				return "门禁读卡器禁止";
			case 1520:
				return "门禁继电器禁止";
			case 1521:
				return "警铃1旁路";
			case 1522:
				return "警铃2旁路";
			case 1524:
				return "辅助继电器旁路";
			case 1551:
				return "主/备份拨号器旁路";
			case 1570:
				return "防区旁路";
			case 1576:
				return "门禁控制系统防区旁路";
			case 1577:
				return "门禁点旁路";
			case 1579:
				return "通道防区旁路";	
			case 1601:
				return "手动测试报告";
			case 1602:
				return "自动测试报告";
			case 1604:
				return "火警测试";
			case 1606:
				return "监听";
			case 1607:
				return "盗警步测";
			case 1608:
				return "关闭(常态)";
			case 1611:
				return "火警步测(点测试)";
			case 1612:
				return "火警步测(非点测试)";	
			case 1621:
				return "事件日志复位";
			case 1622:
				return "事件日志满50%";
			case 1623:
				return "事件日志满90%";
			case 1624:
				return "事件日志溢出";
			case 1625:
				return "时间/日期复位";
			case 1631:
				return "异常时间表改变";
			case 1632:
				return "访问时间表改变";
			case 1901:
				return "前面板通信故障";	
			case 1903:
				return "网络接口断开";
			case 1999:
				return "清除报警记忆";
			case 3000:
				return "保留(恢复)";
			case 3001:
				return "频繁连接(恢复)";
			case 3002:
				return "端口扫描(恢复)";
			case 3100:
				return "医疗救护(恢复)";
			case 3110:
				return "火警(恢复)";
			case 3111:
				return "烟雾报警(火警确认)(恢复)";	
			case 3120:
				return "紧急报警(恢复)";
			case 3121:
				return "劫持报警(恢复)";
			case 3122:
				return "无声紧急报警(恢复)";
			case 3123:
				return "有声紧急报警(恢复)";
			case 3130:
				return "盗警(恢复)";
			case 3131:
				return "周边窃警(恢复)";
			case 3132:
				return "内部窃警(恢复)";
			case 3133:
				return "24小时窃警(恢复)";	
			case 3134:
				return "进入/外出窃警(恢复)";
			case 3135:
				return "日/夜窃警(恢复)";
			case 3140:
				return "一般报警(恢复)";
			case 3150:
				return "24小时辅助报警(恢复)";
			case 3162:
				return "一氧化碳泄漏(恢复)";
			case 3301:
				return "交流掉电(恢复)";
			case 3302:
				return "系统电池电压低(恢复)";
			case 3305:
				return "系统重新设定(主机重启)(恢复)";	
			case 3306:
				return "主机编程被改动";
			case 3308:
				return "关闭主机(恢复)";
			case 3310:
				return "接地失效(恢复)";
			case 3320:
				return "门禁控制系统继电器监控(恢复)";
			case 3321:
				return "警号保险丝报警(恢复)";
			case 3332:
				return "总线回路短路故障(恢复)";
			case 3333:
				return "扩展模块失败(恢复)";	
			case 3338:
				return "模块电池电压低(恢复)";
			case 3339:
				return "ACS模块复位(恢复)";
			case 3341:
				return "模块防拆报警(恢复)";
			case 3342:
				return "模块交流掉电(恢复)";
			case 3343:
				return "ACS模块自测失败(恢复)";
			case 3344:
				return "无线通信模块工作信号差(恢复)";
			case 3350:
				return "网络连接故障(恢复)";
			case 3351:
				return "主机电话线断线(恢复)";
			case 3352:
				return "备份拨号器故障(恢复)";
			case 3353:
				return "模块与主机通信故障(恢复)";
			case 3354:
				return "主机通讯失败(恢复)";
			case 3373:
				return "火警回路故障(恢复)";
			case 3374:
				return "防区退出错误(恢复)";
			case 3378:
				return "交叉防区故障(恢复)";
			case 3380:
				return "防区故障(恢复)";						
			case 3381:
				return "(RF)监控丢失(恢复)";
			case 3382:
				return "RPM监控丢失(恢复)";
			case 3383:
				return "防区防拆(恢复)";
			case 3384:
				return "无线发射器电池电压低(恢复)";
			case 3385:
				return "高灵敏度维修信号(恢复)";
			case 3386:
				return "低灵敏度维修信号(恢复)";
			case 3389:
				return "探测器自测失败(恢复)";
			case 3400:
				return "布防";
			case 3401:
				return "用户布防";
			case 3402:
				return "组布防";
			case 3403:
				return "自动布防";
			case 3406:
				return "用户取消操作(恢复)";
			case 3407:
				return "遥控布防";
			case 3408:
				return "快速布防";
			case 3409:
				return "布撤防锁布防";
			case 3423:
				return "强制撤防门(恢复)";
			case 3426:
				return "正常布防门(恢复)";
			case 3427:
				return "门禁点DSM故障(恢复)";
			case 3428:
				return "门禁点RTE故障(恢复)";
			case 3432:
				return "禁点继电器/触发器失败(恢复)";
			case 3433:
				return "门禁点RTE旁路(恢复)";
			case 3434:
				return "门禁点DSM旁路/取消旁路(恢复)";
			case 3441:
				return "留守布防";
			case 3442:
				return "布撤防锁留守布防";
			case 3451:
				return "布防过早";
			case 3452:
				return "布防过迟";
			case 3456:
				return "局部布防";
			case 3461:
				return "错误操作(安装员码配置错误)(恢复)";
			case 3501:
				return "门禁读卡器禁止(恢复)";
			case 3520:
				return "门禁继电器标止(恢复)";
			case 3521:
				return "警铃1旁路(恢复)";
			case 3522:
				return "警铃2旁路(恢复)";
			case 3524:
				return "辅助继电器旁路(恢复)";
			case 3551:
				return "主/备份拨号器旁路(恢复)";
			case 3570:
				return "防区旁路(恢复)";
			case 3576:
				return "门禁控制系统防区旁路(恢复)";
			case 3577:
				return "门禁点旁路(恢复)";
			case 3579:
				return "通道防区旁路(恢复)";
			case 3601:
				return "手动测试报告(恢复)";
			case 3606:
				return "监听(恢复)";
			case 3608:
				return "关闭(常态)(恢复)";
			case 3611:
				return "火警步测(点测试)(恢复)";
			case 3612:
				return "火警步测(非点测试)(恢复)";
			case 3621:
				return "事件日志复位(恢复)";
			case 3622:
				return "事件日志满50%(恢复)";
			case 3623:
				return "监事件日志满90%(恢复)";
			case 3631:
				return "异常时间表改变(恢复)";
			case 3632:
				return "访问时间表改变(恢复)";
			case 3634:
				return "事件日志溢出(恢复)";
			case 3901:
				return "前面板通信故障(恢复)";
			case 3903:
				return "网络接口断开(恢复)";
			case 3999:
				return "清除报警记忆(恢复)";			
			default:
				return "未定义";		
		}
	}


	public getEventID(eventNum: string): string {

		let eventIDType = eventNum.substring(0, 1);
		let eventIDNum = eventNum.substring(1, 4);

		if ("E" == eventIDType)
		{
			eventIDType = "1";
		}
		else if ("R" == eventIDType)
		{
			eventIDType = "3";
		}
		else
		{
			//return "EventID Error";
			return eventNum;
		}

		return eventIDType + eventIDNum;
	}
}

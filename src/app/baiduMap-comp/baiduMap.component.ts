import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import { DeviceMapIfno } from '../services/deviceMapInfo';

declare const AMap: any;//声明

@Component({
	moduleId: module.id,
	selector: 'app-baiduMap',
	templateUrl: './baiduMap.component.html',
	// styleUrls: ['./baiduMap.component.css']
	styles: [`
	    #containerMap{
	        width: 100%;
	        height: 570px;
	        display: block;
	    }
	`]

})

export class BaiduMapComponent implements OnInit, OnDestroy {
	mMap: any;
	mMarker: any = [];
	mInfoWindow: any;
	opts: any;
	offMakerIndex: any;

	//key is devicename
	deviceMapInfoList: DeviceMapIfno[] =[]; 	
	markerList: Map<string, any> = new Map<string, any>();
	deviceName: string;

	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {

		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);

			console.log("push-alarmMsg-1--:" + rep['devicename']);
			if (rep['action'] == "push-alarmMsg") 
			{
				if(null != this.markerList[rep['devicename']]){
					//need do, check devicename is Marker
					console.log("push-alarmMsg-2--: UP!");
					this.markerList[rep['devicename']].setAnimation('AMAP_ANIMATION_BOUNCE');
				}				
			}
		});
	}


	ngOnInit() {
		console.log("init map===");
		//data for new function
		this.initDeviceMapInfo();

		this.mMap = new AMap.Map('containerMap', {
			resizeEnable: true,
			center: [121.515904, 31.236423],
			zoom: 12
		});
		//地图中添加地图操作ToolBar插件
		this.mMap.plugin(['AMap.ToolBar'], () => {
			//设置地位标记为自定义标记
			var toolBar = new AMap.ToolBar();
			this.mMap.addControl(toolBar);
		});

		let tmpDeviceName: string = "";	

		this.mInfoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });

		for (let i = 0; i < this.deviceMapInfoList.length; i++) {
			tmpDeviceName = this.deviceMapInfoList[i].deviceName;
			console.log("DeviceName in Map list-----:" + tmpDeviceName);

			this.markerList[tmpDeviceName] = new AMap.Marker({
				position: this.deviceMapInfoList[i].lnglat,
				draggable: true,
				icon: "assets/images/logo.png",
				map: this.mMap
			});
			let info = [];
			info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>" + '主机名称 : ' + this.deviceMapInfoList[i].deviceName + "</b>");
			info.push("地址 :" + this.deviceMapInfoList[i].deviceAddress +"</div>");
			this.markerList[tmpDeviceName].content = info.join("<br/>");
			this.markerList[tmpDeviceName].on('click', (e) => {
				this.mInfoWindow.setContent(e.target.content);
				this.mInfoWindow.open(this.mMap, e.target.getPosition());
				this.logDeviceName(e.target.content);
			});
			this.markerList[tmpDeviceName].emit('click', { target: this.markerList[tmpDeviceName] });
			this.mInfoWindow.close();//openInfo()
		}
		AMap.event.addDomListener(document.getElementById('addMarker'), 'click', () => {
			this.addMarker();
		}, false);
		AMap.event.addDomListener(document.getElementById('deleteMarker'), 'click', () => {
			if("" !=this.deviceName)
			{
				this.markerList[this.deviceName].setMap(null);
				//need do delete markerList map
				let has:Boolean = this.markerList.has(this.deviceName);

				this.markerList[this.deviceName] = null;

				//this.markerList.delete(this.deviceName);
				has = this.markerList.has(this.deviceName);
				console.log("after delete"+ has);
//				this.mMap.setFitView(); //位置会移动到中心位置
				this.mInfoWindow.close();
			}	
		}, false);
		AMap.event.addDomListener(document.getElementById('cancelAlarm'), 'click', () => {
			this.cancelAlarm();
		}, false);


		this.mMap.setFitView();

		//bounce alarm device
		let alarmDeviceList = this.mCusomList.getAlarmDevice();

		
		for (let i = 0; i < alarmDeviceList.length; i++)
		{
			if(null != this.markerList[alarmDeviceList[i]]){
				//need do, check devicename is Marker
				console.log("push-alarmMsg-2--: UP!");
				this.markerList[alarmDeviceList[i]].setAnimation('AMAP_ANIMATION_BOUNCE');
			}			
		}
	}
	// 实例化点标记
	addMarker(): void {
		let i = this.mMarker.length;
		this.mMarker[i] = new AMap.Marker({
			position: [121.530904, 31.236423],
			draggable: true,
			icon: "assets/images/logo.png",
			map: this.mMap
		});
		let info = [];
		info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>" + '主机' + (i + 1) + "</b>");
		info.push("地址 :上海浦东张江</div></div>");
		this.mMarker[i].content = info.join("<br/>");
		this.mMarker[i].on('click', (e) => {
			this.mInfoWindow.setContent(e.target.content);
			this.mInfoWindow.open(this.mMap, e.target.getPosition());
		});
		this.mMarker[i].setMap(this.mMap);
		this.mMap.setFitView();
	}
	ngOnDestroy() {

		console.log('===ngOnDestroy====');
	}

	cancelAlarm() {		
		console.log("will cancel----:", this.deviceName);
		if("" !=this.deviceName)
		{
			this.markerList[this.deviceName].setAnimation('AMAP_ANIMATION_NONE');
		
			this.mCusomList.clearAlarmDevice(this.deviceName);

			if(!this.mCusomList.alarmDeviceCount())
			{
				//need do, none of alarm will be pause
				var myAuto = <any>document.getElementById('myaudio');
				myAuto.pause();
			}	
			

			//clear info
			this.deviceName = "";		
			this.mInfoWindow.close();//openInfo()
		}
	}

	initDeviceMapInfo() {
		for(let i=0; i<12; i++)
		{
			this.deviceMapInfoList[i] = new DeviceMapIfno();
		}

		//data for new function
		this.deviceMapInfoList[0].setDeviceMapIfno("device0", [121.614000, 31.195000], "上海浦东李冰路");
		this.deviceMapInfoList[1].setDeviceMapIfno("device1", [121.613904, 31.191176], "上海浦东张衡路1号");
		this.deviceMapInfoList[2].setDeviceMapIfno("device3", [121.615904, 31.196423], "上海浦东伽利略路");
		this.deviceMapInfoList[3].setDeviceMapIfno("device4", [121.612122, 31.191176], "上海浦东哥白尼路");
		this.deviceMapInfoList[4].setDeviceMapIfno("device2", [121.617271, 31.192501], "上海浦东张衡路2号");
		this.deviceMapInfoList[5].setDeviceMapIfno("device5", [121.618904, 31.193423], "上海浦东张衡路3号");
		this.deviceMapInfoList[6].setDeviceMapIfno("nbiot01", [121.617000, 31.195000], "上海浦东李冰路");
		this.deviceMapInfoList[7].setDeviceMapIfno("nbiot02", [121.613978, 31.161122], "上海浦东韩钱路");
		this.deviceMapInfoList[8].setDeviceMapIfno("nbiot03", [121.612233, 31.186423], "上海浦东上科路");
		this.deviceMapInfoList[9].setDeviceMapIfno("nbiot04", [121.552166, 31.188176], "上海浦东沪南路");
		this.deviceMapInfoList[10].setDeviceMapIfno("nbiot05", [121.587271, 31.122588], "上海浦东川周公路");
		this.deviceMapInfoList[11].setDeviceMapIfno("nbiot06", [121.618955, 31.153423], "上海浦东康桥东路");

		
	}

	logDeviceName(content: string):void {
		let deviceName: string = "主机名称 : ";
		let i:number = content.indexOf(deviceName);
		let local:number = i + deviceName.length;
		let includeDeviceName = content.slice(local);
		

		let j:number = includeDeviceName.indexOf("<");

		this.deviceName = includeDeviceName.slice(0, j);
		console.log("select devicename----:", this.deviceName);

	}
}
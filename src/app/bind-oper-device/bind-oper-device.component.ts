import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketClient } from "app/services/websocket";
import { ComEvent } from "app/services/comEvent";
import { CmdPacket } from "app/services/cmdPacket";
import { CustomList } from "app/services/customList";

import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'bind-oper-device',
  templateUrl: './bind-oper-device.component.html',
  styleUrls: ['./bind-oper-device.component.css']
})
export class BindOperDeviceComponent implements OnInit, OnDestroy {
  public accountListData: Account [] = [];
  private id_getBoundDeviceList: string;
  private id_getUnBoundDeviceList: string;
  private id_getBoundOperDevice: string;
  private id_getUnBoundOperDevice: string;
  boundDeviceList: Array<Account> = [];
  unBoundDeviceList: Array<Account> = [];

  iniOperName:string = "client0";
  operators: SelectItem[] =[];
  selectOperName: string = "client0";


  constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) { 
        comEvent.mComEvent.subscribe((sJson: string) => {
        let rep = JSON.parse(sJson);

        if (rep['action'] == "bindOperDevicePage")
        {
              this.sendGetBindInforFrame(this.iniOperName);          
        }
        else if(rep['action'] == "clientgetaccountlist-ack")
        {
              if(0 == rep['errorcode'])
				      {
                  //console.log("bind----getaccount" + "___id:" +rep['id'] + "___accountlist"+ rep['accountlist']);
                  if(this.id_getBoundDeviceList == rep['idack'])
                  {
                      this.boundDeviceList = rep['accountlist'];                  
                  }
                  else if (this.id_getUnBoundDeviceList == rep['idack'])
                  {
                      this.unBoundDeviceList = rep['accountlist'];   
                  }
              }
        }
        else if(rep['action'] == "clientbinddeviceoper-ack")
        {
            if(0 == rep['errorcode'])
				      {
                  //console.log("bind----getaccount" + "___id:" +rep['id'] + "___accountlist"+ rep['accountlist']);
                  if(this.id_getBoundOperDevice == rep['idack'])
                  {
                     console.log("BoundOperDevice ok");                  
                  }
                  else if (this.id_getUnBoundOperDevice == rep['idack'])
                  {
                      console.log("UnBoundOperDevice ok");   
                  }
              }
        }
      });
  }

  oneMoveToTarget(e){
    this.id_getBoundOperDevice = "";
    let frame = this.cmdPacket.getBindDeviceOper(e.items[0].name, this.selectOperName);
    this.id_getBoundOperDevice = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);
  }

  oneMoveToSource(e){
    this.id_getUnBoundOperDevice = "";
    let frame = this.cmdPacket.getUnBindDeviceOper(e.items[0].name, this.selectOperName);
    this.id_getUnBoundOperDevice = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);
  }

  selectedOption(e){
    this.sendGetBindInforFrame(e.value);
  }

  sendGetBindInforFrame(curOper: string)
  {
    // send frame for getting all device bound to selected custom
    this.id_getBoundDeviceList = "";
    //let frame = this.cmdPacket.getBoundDeviceByCustom("0", rep['customid']);
    let frame = this.cmdPacket.getBoundDeviceByOper("0", curOper);
    this.id_getBoundDeviceList = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);

    // send frame for getting all device bound to selected custom
    this.id_getUnBoundDeviceList = "";
    frame = this.cmdPacket.getUnBoundDeviceByOper("0");
    this.id_getUnBoundDeviceList = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);
  }

  ngOnInit() {
    console.log('=bind-oper-device==ngOnInit====');
    this.accountListData = this.mCusomList.getAccountList2();
    
    let name;
    let customid;
    let item: SelectItem;

    for(let k in this.accountListData) {
      name = this.accountListData[k].name;
      item = {label:name, value:name};
      this.operators.push(item);
		}
  }

  ngOnDestroy() {

		console.log('=bind-oper-device==ngOnDestroy====');
	}

}

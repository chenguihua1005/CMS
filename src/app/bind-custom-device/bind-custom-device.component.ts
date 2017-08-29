import { Component, OnInit } from '@angular/core';
import { ComEvent } from "app/services/comEvent";
import { CustomList } from "app/services/customList";
import { CmdPacket } from "app/services/cmdPacket";
import { WebsocketClient } from "app/services/websocket";
import { Custom } from "app/services/custom";

//for primeng
import { MenuItem } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'bind-custom-device',
  templateUrl: './bind-custom-device.component.html',
  styleUrls: ['./bind-custom-device.component.css']
})
export class BindCustomDeviceComponent implements OnInit {
  private id_getBoundDeviceList: string;
  private id_getUnBoundDeviceList: string;
  private id_getBoundCustomDevice: string;
  private id_getUnBoundCustomDevice: string;
  boundDeviceList: Array<Account> = [];
  unBoundDeviceList: Array<Account> = [];

  iniCustomid:string = "doppio";
  customs: SelectItem[] =[];
  selectCustomID: string = "doppio";

  constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) { 
        comEvent.mComEvent.subscribe((sJson: string) => {
        let rep = JSON.parse(sJson);

        if (rep['action'] == "bindCustomDevicePage")
        {
              this.sendGetBindInforFrame(this.iniCustomid);          
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
        else if(rep['action'] == "clientbinddevicecustom-ack")
        {
            if(0 == rep['errorcode'])
				      {
                  //console.log("bind----getaccount" + "___id:" +rep['id'] + "___accountlist"+ rep['accountlist']);
                  if(this.id_getBoundCustomDevice == rep['idack'])
                  {
                     console.log("BoundCustomDevice ok");                  
                  }
                  else if (this.id_getUnBoundCustomDevice == rep['idack'])
                  {
                      console.log("UnBoundCustomDevice ok");   
                  }
              }
        }
      });
  }


  ngOnInit() {
    let name;
    let customid;
    let item: SelectItem;

    for(let k in this.mCusomList.mCustomList) {
      name = this.mCusomList.mCustomList[k].name;
      customid = this.mCusomList.mCustomList[k].customid;
      item = {label:name, value:customid};
      this.customs.push(item);
		}
  }

  oneMoveToTarget(e){
    this.id_getBoundCustomDevice = "";
    let frame = this.cmdPacket.getBindDeviceCustom(e.items[0].name, this.selectCustomID);
    this.id_getBoundCustomDevice = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);
  }

  oneMoveToSource(e){
    this.id_getUnBoundCustomDevice = "";
    let frame = this.cmdPacket.getUnBindDeviceCustom(e.items[0].name, this.selectCustomID);
    this.id_getUnBoundCustomDevice = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);
  }

  selectedOption(e){
    this.sendGetBindInforFrame(e.value);
  }

  sendGetBindInforFrame(curCustom: string)
  {
    // send frame for getting all device bound to selected custom
    this.id_getBoundDeviceList = "";
    //let frame = this.cmdPacket.getBoundDeviceByCustom("0", rep['customid']);
    let frame = this.cmdPacket.getBoundDeviceByCustom("0", curCustom);
    this.id_getBoundDeviceList = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);

    // send frame for getting all device bound to selected custom
    this.id_getUnBoundDeviceList = "";
    frame = this.cmdPacket.getUnBoundDeviceByCustom("0");
    this.id_getUnBoundDeviceList = this.cmdPacket.getAnyProtocolID(frame);	
    this.ws.doSend(frame);
  }
}

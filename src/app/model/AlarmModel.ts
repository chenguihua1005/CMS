// import {EventEmitter} from '../../lib/eventEmitter';
//declare var EventEmitter;

import {Process} from '../bridge/process';
import {EventEmitter} from '@angular/core';

export class AlarmModel {

  public static _process: Process;
   private static _instance = null;

   public static getInstance(process:Process) : AlarmModel{
     if (AlarmModel._instance == null){
       AlarmModel._instance = new AlarmModel();
       AlarmModel._process = process;
           window['alarmModel'] = {
             event: new EventEmitter(),
             xxxarr: '',
             xxxarr2: '',
             setMO: function(json){
               AlarmModel._sendMessage(json);
             },
             setMO2: function(json){
               AlarmModel._sendMessage(json);
             }
           }
     }
     return AlarmModel._instance;
   }


  public _reveiveAlarmList( jsonString: any) {
    window['mo'].xxxarr = jsonString;
    // TODO process jsonStrng
  }

  //action ={
  //  name: 'queryAAData',
  //  param:param
  //}
  //public static sendQueryAction(action): void {
  //  AlarmModel._process.doSend(action);
  //}

  public static _sendMessage(json: any) {
    AlarmModel._process._sendMessage(json);
  }

}




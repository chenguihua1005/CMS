import { AlarmModel } from '../model/AlarmModel';
//import { XXXModel } from '../model/XXXModel';
import { WebsocketClient } from '../services/websocket';

export class Process {

  public static _alarmModel: AlarmModel;
  public static _websocketClient: any;
  private static _instance = null;

  public static getInstance(websocketClient: WebsocketClient): Process{
    if (Process._instance == null){
      Process._instance = new Process();
      Process._alarmModel = AlarmModel.getInstance(Process._instance);
      Process._websocketClient  = websocketClient;
    }
    return Process._instance;
  }

	public _processMessage(json: any) {

    if (json['action'] == 'push-alarmMsg') {
      Process._alarmModel._reveiveAlarmList('xxxlist');
    }
    //else if (json['action'] == 'XXXX'){
    //this.alarmModel.alermList2 = json['xxxlist2'];
    // }

    //else if (json['action'] == 'XXXX2'){
    //this.xxxModel.xxxlist = json['xxxlist2'];
    // }

	}

  public _sendMessage(json: any) {
    Process._websocketClient.doSend(JSON.stringify(json));
  }

}

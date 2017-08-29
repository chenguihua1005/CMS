import { Component, OnInit } from '@angular/core';
import { ComEvent } from "app/services/comEvent";
import { CustomList } from "app/services/customList";
import { CmdPacket } from "app/services/cmdPacket";
import { WebsocketClient } from "app/services/websocket";

//for primeng
import { MenuItem } from 'primeng/primeng';



@Component({
  selector: 'app-main-menu-operator',
  templateUrl: './main-menu-operator.component.html',
  styleUrls: ['./main-menu-operator.component.css']
})
export class MainMenuOperatorComponent implements OnInit {

  public status: any = {
		isFirstOpen: true,
		isOpen: false
	};

  private id_getOperatorList: string;
	operatorList: Account[] = [];
  selectedOperator: Account;
  
  //for primeng
	items: MenuItem[] = [];


  constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) { 
        comEvent.mComEvent.subscribe((sJson: string) => {
        let rep = JSON.parse(sJson);

        if (rep['action'] == "main-menu-operator")
        {
          
            // send frame for getting all device bound to selected custom
              this.id_getOperatorList = "";
          		let frame = this.cmdPacket.getOperatorList("0");
		          this.id_getOperatorList = this.cmdPacket.getAnyProtocolID(frame);	
		          this.ws.doSend(frame);
        }         
        else if(rep['action'] == "clientgetaccountlist-ack")
        {
              if(0 == rep['errorcode'])
				      {
                  console.log("bind----getOperator" + sJson);
                  //console.log("bind----getaccount" + "___id:" +rep['id'] + "___accountlist"+ rep['accountlist']);
                  if(this.id_getOperatorList == rep['idack'])
                  {
                      this.operatorList = [];
                      this.operatorList = rep['accountlist']; 
                  }
              }
        }
      });
  }
  ngOnInit() {
    //for primeng---- test
    let ssJson: string = '{"action":"clientgetaccountlist-ack","idack":"08","errorcode":0,"errormsg":"Succeed","accountlist":[{"domainid":"0","name":"device0","password":"123456","type":1100,"describe":"测试Device客户端","duetime":"0001-01-01T00:00:00Z","enabled":1,"lastlogintime":"2017-07-14T02:45:01.45Z","registertime":"0001-01-01T00:00:00Z","online":0,"rolename":"","version":18},{"domainid":"0","name":"nbiot05","password":"123456","type":1101,"describe":"NBIoT报警设备05","duetime":"0001-01-01T00:00:00Z","enabled":1,"lastlogintime":"0001-01-01T00:00:00Z","registertime":"0001-01-01T00:00:00Z","online":0,"rolename":"","version":0}]}';
    let repp = JSON.parse(ssJson);
    this.operatorList = repp['accountlist'];

    for (let i = 0; i < this.operatorList.length; i++)
    {
      this.items[i] = {"label":""}; 
      this.items[i].label = this.operatorList[i].name;
    }

  }

  onSelectCustom(operator: Account): void {
    //console.log("=======onSelectCustom======="+hero.customid);
    this.selectedOperator = operator;
    this.comEvent.mComEvent.emit('{"action":"bindOperDevicePage","opername":"' + operator.name + '"}');
  }


}

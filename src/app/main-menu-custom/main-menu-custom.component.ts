import { Component, OnInit } from '@angular/core';
import { ComEvent } from "app/services/comEvent";
import { Custom } from "app/services/custom";
import { CustomList } from "app/services/customList";

//for primeng
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-main-menu-custom',
  templateUrl: './main-menu-custom.component.html',
  styleUrls: ['./main-menu-custom.component.css']
})

export class MainMenuCustomComponent implements OnInit {

  public status: any = {
		isFirstOpen: true,
		isOpen: false
	};

	customList: Custom[] = [];
  selectedCustom: Custom;
  
  //for primeng
	items: MenuItem[] = [];

  constructor(private comEvent: ComEvent, private mCusomList: CustomList) { 
        comEvent.mComEvent.subscribe((sJson: string) => {
        let rep = JSON.parse(sJson);

        if (rep['action'] == "main-menu-custom")
        {
          this.customList = [];
          this.customList = this.mCusomList.customList;
        }
      });
  }

  ngOnInit() {
    //for primeng---- test
    let ssJson: string = '{"action":"clientgetcustomlist-ack","idack":"03","errorcode":0,"errormsg":"Succeed","customlist":[{"address":"张江李冰路430","customid":"doppio","name":"保安中心Doppio","telephone":"021-28941444"},{"address":"张江李冰路430","customid":"nbiot","name":"保安中心NBIot","telephone":"021-28941444"},{"address":"上海市浦东李冰路430号","customid":"icbc01","name":"工商银行","telephone":"021-28942011"},{"address":"上海市浦东新区申江路","customid":"User01","name":"个人用户1","telephone":"021-28941333"},{"address":"上海市浦东新区张江高科","customid":"ccb01","name":"建设银行","telephone":"021-28941234"},{"address":"上海市浦东新区广兰路","customid":"kfc01","name":"肯德基","telephone":"021-28941222"}]}';
    let repp = JSON.parse(ssJson);
    this.customList = repp['customlist'];

    for (let i = 0; i < this.customList.length; i++)
    {
      this.items[i] = {"label":""}; //
      this.items[i].label = this.customList[i].name;
    }


  }

  	onSelectCustom(custom: Custom): void {
		//console.log("=======onSelectCustom======="+hero.customid);
		this.selectedCustom = custom;
		this.mCusomList.setCurCustomid(custom.customid);
		this.comEvent.mComEvent.emit('{"action":"bindCustomDevicePage","customid":"' + custom.customid + '"}');
	}

}

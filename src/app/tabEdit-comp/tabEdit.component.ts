import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Location }  from '@angular/common';


import { ComEvent } from "app/services/comEvent";

@Component({
	moduleId: module.id,
  selector: 'tab-edit',
  templateUrl: './tabEdit.component.html',
  styleUrls: ['./tabEdit.component.css']

})
export class TabEditComponent {
  constructor(private comEvent: ComEvent) 
  { }

  public bindOperDevicePage(): void {
    this.comEvent.mComEvent.emit('{"action":"' + "main-menu-operator" + '"}');
  }

  public bindCustomDevicePage(): void {
    this.comEvent.mComEvent.emit('{"action":"' + "main-menu-custom" + '"}');
  }


  public alertUNMe(): void {
    console.log('unselected bind operator');
  }
  
  handleChange(e){
    let index = e.index;
    console.log("get e-----"+e.index);

    if(3 == e.index)
    {
      this.comEvent.mComEvent.emit('{"action":"' + "bindCustomDevicePage" + '"}');
    }
    if(5 == e.index)
    {
      this.comEvent.mComEvent.emit('{"action":"' + "bindOperDevicePage" + '"}');
    }
  }

}

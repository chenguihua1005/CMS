import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Scene } from '../services/scene';
import { Subsys } from '../services/subsys';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';


@Component({
	moduleId: module.id,
	selector: 'scene-table',
	templateUrl: './sceneTable.component.html',
	styleUrls: ['./sceneTable.component.css']

})
export class SceneTableComponent {
	public sceneListData: Array<Scene> = [];
	public sceneList: Array<Scene> = [];
	public subsysList: Array<Subsys> = [];
	public numList: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "D"];
	public mDevicename: string;
	public mPwd: Array<string> = [];
	public selected: string = "";
	public pwd: string = "";

	constructor(private comEvent: ComEvent, private mCusomList: CustomList) {


		comEvent.mComEvent.subscribe((sJson: string) => {
			let rep = JSON.parse(sJson);
			if (rep['action'] == "push-sceneMsg") {
				//if(this.mDevicename == rep['devicename'] )
				//	this.sceneList = this.mCusomList.getCustomPanelSceneList(this.mDevicename);
			} else if (rep['action'] == "press-panel") {
				this.sceneList = [];
				this.sceneList = this.mCusomList.getCustomPanelSceneList(1);
				this.subsysList = this.mCusomList.getCustomPanelSubsysList();

			}

		})
	}
	ngOnInit() {
		this.sceneList = [];
		this.sceneList = this.mCusomList.getCustomPanelSceneList(1);
		this.subsysList = this.mCusomList.getCustomPanelSubsysList();
	}
	public editBtn(scene: Scene): void {
		this.selected = "";
		this.pwd = "";
		//console.log(scene);

		for (let i = 0; i < this.sceneList.length; i++) {
			if (this.sceneList[i] != scene) {
				this.sceneList[i].checked = false;
			} else {
				this.sceneList[i].checked = !this.sceneList[i].checked;
			}
		}
		if (scene.checked == true) {
			//this.comEvent.mComEvent.emit('{"action":"dialog-editScene"}');
		}
	}
	public numBtn(inputNum: any): void {
		if (inputNum == 'comfirm') {

		} else if (inputNum == 'cancel') {

		} else if (inputNum == 'C') {
			this.pwd = "";
		} else if (inputNum == 'D') {
			this.pwd = this.pwd.substring(0, this.selected.length - 1);
		} else {
			this.pwd = this.pwd + inputNum;
		}
		this.selected = this.pwd.replace(/[0-9]/ig, "*");

	}
	public clikedDropdown(cur: Subsys): void {
		console.log("#cur.subsysid#####" + cur.subsysid);
		this.sceneList = this.mCusomList.getCustomPanelSceneList(cur.subsysid);
		this.subsysList = this.mCusomList.getCustomPanelSubsysList();

	}
}

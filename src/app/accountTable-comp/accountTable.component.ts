import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Account } from '../services/account';
import { ComEvent } from '../services/comEvent';
import { CustomList } from '../services/customList';
import { WebsocketClient } from '../services/websocket';
import { CmdPacket } from '../services/cmdPacket';

@Component({
	moduleId: module.id,
	selector: 'account-table',
	templateUrl: './accountTable.component.html',
	styleUrls: ['./accountTable.component.css']

})
export class AccountTableComponent {
	public totalItems: number = 64;
	public accountListData: Account [] = [];
	public mDevicename: string;

	//add delete modify
	displayDialog : Boolean;
	account:Account = new Account();
	selectedAccount: Account;
	newAccount: Boolean;

	private id_editAccount: string;
	private id_deleteAccount: string;
	private id_newAccount: string;

	constructor(private ws: WebsocketClient, private comEvent: ComEvent, private cmdPacket: CmdPacket, private mCusomList: CustomList) {
		
		comEvent.mComEvent.subscribe((sJson: string) => {
			//console.log("#accountTable#####"+sJson);
			let rep = JSON.parse(sJson);
			if (rep['action'] == "clientsetaccount-ack") {
				if(0 == rep['errorcode'])
				{
					if(this.id_editAccount == rep['idack'])
					{
						console.log("edit account ok");               
					}
					else if (this.id_newAccount == rep['idack'])
					{
						console.log("new account ok");
					}
					//send getAccountList protocol
					//let req = this.cmdPacket.getClientgetaccountlist("", "", "", "", 0);
					//this.ws.doSend(req);

					;//refresh tab
				}

			} else if(rep['action'] == "clientdeleteaccount-ack")
			{
				if(0 == rep['errorcode'])
				{
					if(this.id_deleteAccount == rep['idack'])
					{
						console.log("delete account ok");                  
					}
					//send getAccountList protocol
					//let req = this.cmdPacket.getClientgetaccountlist("", "", "", "", 0);
					//this.ws.doSend(req);
					//this.mCusomList.mAccountList.clear();
					//this.mCusomList.mAccountList = new Map<string, Account>();
					
					;//refresh tab
				}
			}
		});

	}
	ngOnInit() {
		this.accountListData = this.mCusomList.getAccountList();
		this.totalItems = this.accountListData.length;

		//type map to string
		this.parseType();
		console.log("#accountTable1#####" + this.accountListData.length);
	}

	parseType() {
		for(let data of this.accountListData) {
			data.type = this.getTypeStringByTypeID(parseInt(data.type));
		}
	}

	showDialogToAdd() {
        this.newAccount = true;
        this.account = new Account();
        this.displayDialog = true;
    }
    
    save() {
		
        let accounts = [...this.accountListData];
        if(this.newAccount)
            accounts.push(this.account);
        else
            accounts[this.findSelectedAccountIndex()] = this.account;

		let frame;

		if(this.newAccount)
        {
			this.id_newAccount = "";

		
			frame = this.cmdPacket.getClientNewAccount("0", this.account.name, this.account.password, Number(this.account.type), 
															"this.account.describe", "", Boolean(this.account.enabled));
			this.id_newAccount = this.cmdPacket.getAnyProtocolID(frame);	
			this.ws.doSend(frame);	
		}
        else
        {
			this.id_editAccount = "";
		
			frame = this.cmdPacket.getClientSetAccount("0", this.account.name, this.account.password, Number(this.account.type), 
															this.account.describe, "", Boolean(this.account.enabled));
			this.id_editAccount = this.cmdPacket.getAnyProtocolID(frame);	
			this.ws.doSend(frame);		
		}

		this.accountListData = accounts;	
		this.account = null;
		this.displayDialog = false;
    }
    
    delete() {
        let index = this.findSelectedAccountIndex();
        this.accountListData = this.accountListData.filter((val,i) => i!=index);
		
		//clear 
		this.id_deleteAccount = "";
		
		//get frame for using delete account, store this id of the frame.
		let frame = this.cmdPacket.getClientDeleteAccount("0", this.account.name);
		this.id_deleteAccount = this.cmdPacket.getAnyProtocolID(frame);

		this.ws.doSend(frame);

		this.account = null;
		this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newAccount = false;
        this.account = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(acc: Account): Account {
        let account = new Account();
        for(let prop in acc) {
            account[prop] = acc[prop];
        }
        return account;
    }
    
    findSelectedAccountIndex(): number {
		let i = this.accountListData.indexOf(this.selectedAccount);
        return i;
	}
	
	public getTypeStringByTypeID(tType : number): string {
		switch (tType) {
			case 1100:
				return "Eagle 主机";
			case 1200:
				return "Doppio 网关";
			case 1900:
				return "第三方主机";
			case 2100:
				return "PC View 客户端";
			case 2200:
				return "Web View 客户端";
			case 2310:
				return "接警 Android App";
			case 2320:
				return "接警 IOS App";
			case 2410:
				return "出警 Android App";
			case 2420:	
				return "出警 IOS App";
			default:
				return "未定义";		
		}
	}	
}
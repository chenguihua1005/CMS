//import----system
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, EventEmitter} from '@angular/core';

//import----3rd
import { ChartsModule } from 'ng2-charts';

//import----prime face
import { ButtonModule, PanelModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelMenuModule,MenuItem } from 'primeng/primeng';
import { DataTableModule,SharedModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';

//declarations
import { AppComponent } from './app-comp/app.component';
import { HomeComponent } from './home-comp/home.component';
import { LoginComponent } from './login-comp/login.component';
import { TopMenuComponent } from './topMenu-comp/topMenu.component';
import { MainMenuComponent } from './mainMenu-comp/mainMenu.component';
import { MainMenuCustomPanelComponent } from './main-menu-custom-panel/main-menu-custom-panel.component';
import { MainMenuOperatorComponent } from './main-menu-operator/main-menu-operator.component';
import { MainMenuCustomComponent } from './main-menu-custom/main-menu-custom.component';
import { TabPanelComponent } from './tabPanel-comp/tabPanel.component';
import { TabQueryComponent } from './tabQuery-comp/tabQuery.component';
import { TabEditComponent } from './tabEdit-comp/tabEdit.component';
import { ChartComponent } from './chart-comp/chart.component';
import { BaiduMapComponent } from './baiduMap-comp/baiduMap.component';
import { AlarmTableComponent } from './alarmTable-comp/alarmTable.component';
import { SubsysTableComponent } from './subsysTable-comp/subsysTable.component';
import { DomainTableComponent } from './domainTable-comp/domainTable.component';
import { AccountTableComponent } from './accountTable-comp/accountTable.component';
import { AccountTable2Component } from './accountTable2-comp/accountTable2.component';
import { CustomTableComponent } from './customTable-comp/customTable.component';
import { BindCustomDeviceComponent } from './bind-custom-device/bind-custom-device.component';
import { BindOperDeviceComponent } from './bind-oper-device/bind-oper-device.component';
import{ ZoneTableComponent } from './zoneTable-comp/zoneTable.component';

//providers
import { WebsocketClient } from './services/websocket';
import { ComEvent } from './services/comEvent';
import { CmdPacket } from './services/cmdPacket';
import { Panel } from './services/panel';
import { Custom } from './services/custom';
import { CustomList } from './services/customList';
import { Domain} from './services/domain';

//import { BaiduMap } from "angular2-baidu-map";
//https://www.angular.cn/docs/ts/latest/cli-quickstart.html
//http://valor-software.com/ngx-bootstrap/#/
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopMenuComponent,
    MainMenuComponent,
    MainMenuCustomPanelComponent,
    MainMenuOperatorComponent,
    MainMenuCustomComponent,
    TabEditComponent,
    TabPanelComponent,
    TabQueryComponent,
    ChartComponent,
    BaiduMapComponent,
    AlarmTableComponent,
    SubsysTableComponent,
    DomainTableComponent,
    AccountTableComponent,
    AccountTable2Component,
    CustomTableComponent,
    BindCustomDeviceComponent,
    BindOperDeviceComponent,
    ZoneTableComponent
  ],
  imports: [
    //system
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,


    //3rd
    ChartsModule,

    //prime face
    ButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    PanelMenuModule,
    DataTableModule,
    SharedModule,
    TabViewModule,
    DialogModule,
    PickListModule,
    ListboxModule,
    DropdownModule,
    GrowlModule,
    ChartModule,
    SelectButtonModule
  ],
  providers: [CustomList, CmdPacket, WebsocketClient, ComEvent],
  bootstrap: [AppComponent]
})
export class AppModule { }

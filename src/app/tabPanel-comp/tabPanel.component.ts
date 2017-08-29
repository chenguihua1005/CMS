import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ComEvent } from "app/services/comEvent";

//import { DomSanitizer } from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  selector: 'tab-panel',
  templateUrl: './tabPanel.component.html',
  styleUrls: ['./tabPanel.component.css']

})
export class TabPanelComponent {
 constructor(private comEvent: ComEvent) 
  { }

  //  public constructor(sanitizer: DomSanitizer) {

  // }

}

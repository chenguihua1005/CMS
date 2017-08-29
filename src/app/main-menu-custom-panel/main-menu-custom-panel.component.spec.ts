import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuCustomPanelComponent } from './main-menu-custom-panel.component';

describe('MainMenuCustomPanelComponent', () => {
  let component: MainMenuCustomPanelComponent;
  let fixture: ComponentFixture<MainMenuCustomPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuCustomPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuCustomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

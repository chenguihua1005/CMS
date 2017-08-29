import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindOperDeviceComponent } from './bind-oper-device.component';

describe('BindOperDeviceComponent', () => {
  let component: BindOperDeviceComponent;
  let fixture: ComponentFixture<BindOperDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindOperDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindOperDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindCustomDeviceComponent } from './bind-custom-device.component';

describe('BindCustomDeviceComponent', () => {
  let component: BindCustomDeviceComponent;
  let fixture: ComponentFixture<BindCustomDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindCustomDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindCustomDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

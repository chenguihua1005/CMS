import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuCustomComponent } from './main-menu-custom.component';

describe('MainMenuCustomComponent', () => {
  let component: MainMenuCustomComponent;
  let fixture: ComponentFixture<MainMenuCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

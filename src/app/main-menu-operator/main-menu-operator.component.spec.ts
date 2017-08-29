import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuOperatorComponent } from './main-menu-operator.component';

describe('MainMenuOperatorComponent', () => {
  let component: MainMenuOperatorComponent;
  let fixture: ComponentFixture<MainMenuOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

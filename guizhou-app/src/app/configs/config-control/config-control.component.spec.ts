import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigControlComponent } from './config-control.component';

describe('ConfigControlComponent', () => {
  let component: ConfigControlComponent;
  let fixture: ComponentFixture<ConfigControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

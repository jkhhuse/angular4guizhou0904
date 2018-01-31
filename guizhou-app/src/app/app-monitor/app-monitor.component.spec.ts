import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMonitorComponent } from './app-monitor.component';

describe('AppMonitorComponent', () => {
  let component: AppMonitorComponent;
  let fixture: ComponentFixture<AppMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaMonitorComponent } from './opera-monitor.component';

describe('OperaMonitorComponent', () => {
  let component: OperaMonitorComponent;
  let fixture: ComponentFixture<OperaMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperaMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

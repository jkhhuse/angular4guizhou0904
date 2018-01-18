import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPlatformComponent } from './monitor-platform.component';

describe('MonitorPlatformComponent', () => {
  let component: MonitorPlatformComponent;
  let fixture: ComponentFixture<MonitorPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

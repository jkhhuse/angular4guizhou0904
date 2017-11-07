import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSubscribeComponent } from './service-subscribe.component';

describe('ServiceSubscribeComponent', () => {
  let component: ServiceSubscribeComponent;
  let fixture: ComponentFixture<ServiceSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInstanceDetailComponent } from './service-instance-detail.component';

describe('ServiceInstanceDetailComponent', () => {
  let component: ServiceInstanceDetailComponent;
  let fixture: ComponentFixture<ServiceInstanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInstanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInstanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

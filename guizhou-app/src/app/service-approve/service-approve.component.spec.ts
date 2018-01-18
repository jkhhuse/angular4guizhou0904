import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceApproveComponent } from './service-approve.component';

describe('ServiceApproveComponent', () => {
  let component: ServiceApproveComponent;
  let fixture: ComponentFixture<ServiceApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

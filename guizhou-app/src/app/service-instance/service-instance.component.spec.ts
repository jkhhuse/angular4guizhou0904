import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInstanceComponent } from './service-instance.component';

describe('ServiceInstanceComponent', () => {
  let component: ServiceInstanceComponent;
  let fixture: ComponentFixture<ServiceInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

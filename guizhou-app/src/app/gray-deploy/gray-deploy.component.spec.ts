import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayDeployComponent } from './gray-deploy.component';

describe('GrayDeployComponent', () => {
  let component: GrayDeployComponent;
  let fixture: ComponentFixture<GrayDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrayDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrayDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeployComponent } from './app-deploy.component';

describe('AppDeployComponent', () => {
  let component: AppDeployComponent;
  let fixture: ComponentFixture<AppDeployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDeployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

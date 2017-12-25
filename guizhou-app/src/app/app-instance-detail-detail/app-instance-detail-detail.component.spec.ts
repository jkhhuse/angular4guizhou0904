import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstanceDetailDetailComponent } from './app-instance-detail-detail.component';

describe('AppInstanceDetailDetailComponent', () => {
  let component: AppInstanceDetailDetailComponent;
  let fixture: ComponentFixture<AppInstanceDetailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInstanceDetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInstanceDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

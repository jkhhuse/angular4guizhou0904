import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOverviewDetailDetailComponent } from './app-overview-detail-detail.component';

describe('AppOverviewDetailDetailComponent', () => {
  let component: AppOverviewDetailDetailComponent;
  let fixture: ComponentFixture<AppOverviewDetailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOverviewDetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOverviewDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

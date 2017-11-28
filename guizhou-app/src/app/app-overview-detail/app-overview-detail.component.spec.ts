import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOverviewDetailComponent } from './app-overview-detail.component';

describe('AppOverviewDetailComponent', () => {
  let component: AppOverviewDetailComponent;
  let fixture: ComponentFixture<AppOverviewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOverviewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOverviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

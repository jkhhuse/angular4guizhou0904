import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaOverviewComponent } from './opera-overview.component';

describe('OperaOverviewComponent', () => {
  let component: OperaOverviewComponent;
  let fixture: ComponentFixture<OperaOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperaOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

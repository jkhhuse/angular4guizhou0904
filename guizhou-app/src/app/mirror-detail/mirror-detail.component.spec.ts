import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorDetailComponent } from './mirror-detail.component';

describe('MirrorDetailComponent', () => {
  let component: MirrorDetailComponent;
  let fixture: ComponentFixture<MirrorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirrorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNztableComponent } from './app-nztable.component';

describe('AppNztableComponent', () => {
  let component: AppNztableComponent;
  let fixture: ComponentFixture<AppNztableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNztableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNztableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

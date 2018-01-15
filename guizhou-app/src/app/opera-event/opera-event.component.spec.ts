import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaEventComponent } from './opera-event.component';

describe('OperaEventComponent', () => {
  let component: OperaEventComponent;
  let fixture: ComponentFixture<OperaEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperaEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

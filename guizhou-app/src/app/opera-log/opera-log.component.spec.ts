import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaLogComponent } from './opera-log.component';

describe('OperaLogComponent', () => {
  let component: OperaLogComponent;
  let fixture: ComponentFixture<OperaLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperaLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

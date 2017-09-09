import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCenterComponent } from './file-center.component';

describe('FileCenterComponent', () => {
  let component: FileCenterComponent;
  let fixture: ComponentFixture<FileCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

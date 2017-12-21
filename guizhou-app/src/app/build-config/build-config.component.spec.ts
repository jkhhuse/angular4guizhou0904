import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildConfigComponent } from './build-config.component';

describe('BuildConfigComponent', () => {
  let component: BuildConfigComponent;
  let fixture: ComponentFixture<BuildConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

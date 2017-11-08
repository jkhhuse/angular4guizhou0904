import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildImageComponent } from './build-image.component';

describe('BuildImageComponent', () => {
  let component: BuildImageComponent;
  let fixture: ComponentFixture<BuildImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

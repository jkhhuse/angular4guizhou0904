import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildImageCategoryComponent } from './build-image-category.component';

describe('BuildImageCategoryComponent', () => {
  let component: BuildImageCategoryComponent;
  let fixture: ComponentFixture<BuildImageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildImageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildImageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

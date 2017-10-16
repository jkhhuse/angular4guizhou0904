import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInstanceComponent } from './container-instance.component';

describe('ContainerInstanceComponent', () => {
  let component: ContainerInstanceComponent;
  let fixture: ComponentFixture<ContainerInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

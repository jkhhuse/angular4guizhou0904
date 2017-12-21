import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocFileComponent } from './doc-file.component';

describe('DocFileComponent', () => {
  let component: DocFileComponent;
  let fixture: ComponentFixture<DocFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorStoreComponent } from './mirror-store.component';

describe('MirrorStoreComponent', () => {
  let component: MirrorStoreComponent;
  let fixture: ComponentFixture<MirrorStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirrorStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

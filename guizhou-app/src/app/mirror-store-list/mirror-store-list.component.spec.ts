import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MirrorStoreListComponent } from './mirror-store-list.component';

describe('MirrorStoreListComponent', () => {
  let component: MirrorStoreListComponent;
  let fixture: ComponentFixture<MirrorStoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MirrorStoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MirrorStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

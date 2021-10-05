import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KendoxModalComponent } from './kendo-x-modal.component';

describe('KendoxModalComponent', () => {
  let component: KendoxModalComponent;
  let fixture: ComponentFixture<KendoxModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoxModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

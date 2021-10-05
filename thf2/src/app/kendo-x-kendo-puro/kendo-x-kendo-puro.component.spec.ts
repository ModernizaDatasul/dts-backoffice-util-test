import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KendoxKendoPuroComponent } from './kendo-x-kendo-puro.component';

describe('KendoxKendoPuroComponent', () => {
  let component: KendoxKendoPuroComponent;
  let fixture: ComponentFixture<KendoxKendoPuroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoxKendoPuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoxKendoPuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

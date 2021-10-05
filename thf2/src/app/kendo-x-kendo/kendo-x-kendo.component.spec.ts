import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KendoxKendoComponent } from './kendo-x-kendo.component';

describe('KendoxKendoComponent', () => {
  let component: KendoxKendoComponent;
  let fixture: ComponentFixture<KendoxKendoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoxKendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoxKendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

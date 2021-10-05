import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KendoxTableComponent } from './kendo-x-table.component';

describe('KendoxTableComponent', () => {
  let component: KendoxTableComponent;
  let fixture: ComponentFixture<KendoxTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoxTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

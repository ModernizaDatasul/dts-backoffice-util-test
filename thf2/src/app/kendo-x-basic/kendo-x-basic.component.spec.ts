import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KendoxBasicComponent } from './kendo-x-basic.component';

describe('KendoxBasicComponent', () => {
  let component: KendoxBasicComponent;
  let fixture: ComponentFixture<KendoxBasicComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoxBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoxBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerDashComponent } from './customer-dash.component';

describe('CustomerDashComponent', () => {
  let component: CustomerDashComponent;
  let fixture: ComponentFixture<CustomerDashComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

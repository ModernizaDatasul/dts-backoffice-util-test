import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesMaintComponent } from './heroes-maint.component';

describe('HeroesMaintComponent', () => {
  let component: HeroesMaintComponent;
  let fixture: ComponentFixture<HeroesMaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesMaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

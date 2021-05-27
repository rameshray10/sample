import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIdModelComponent } from './customer-id-model.component';

describe('CustomerIdModelComponent', () => {
  let component: CustomerIdModelComponent;
  let fixture: ComponentFixture<CustomerIdModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerIdModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIdModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShow } from './product-show';

describe('ProductShow', () => {
  let component: ProductShow;
  let fixture: ComponentFixture<ProductShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductShow],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductShow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

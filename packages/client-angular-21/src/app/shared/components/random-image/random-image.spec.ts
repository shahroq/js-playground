import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImage } from './random-image';

describe('RandomImage', () => {
  let component: RandomImage;
  let fixture: ComponentFixture<RandomImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomImage],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

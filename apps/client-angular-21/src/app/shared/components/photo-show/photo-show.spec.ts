import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoShow } from './photo-show';

describe('PhotoShow', () => {
  let component: PhotoShow;
  let fixture: ComponentFixture<PhotoShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoShow],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoShow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

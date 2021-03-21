import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputErrorComponent } from './custom-input-error.component';

describe('CustomInputErrorComponent', () => {
  let component: CustomInputErrorComponent;
  let fixture: ComponentFixture<CustomInputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInputErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

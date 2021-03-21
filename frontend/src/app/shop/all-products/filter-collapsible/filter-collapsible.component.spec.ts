import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCollapsibleComponent } from './filter-collapsible.component';

describe('FilterCollapsibleComponent', () => {
  let component: FilterCollapsibleComponent;
  let fixture: ComponentFixture<FilterCollapsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCollapsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCollapsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

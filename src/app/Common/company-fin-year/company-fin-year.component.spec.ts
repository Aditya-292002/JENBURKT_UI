import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFinYearComponent } from './company-fin-year.component';

describe('CompanyFinYearComponent', () => {
  let component: CompanyFinYearComponent;
  let fixture: ComponentFixture<CompanyFinYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFinYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFinYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPayementListComponent } from './approved-payement-list.component';

describe('ApprovedPayementListComponent', () => {
  let component: ApprovedPayementListComponent;
  let fixture: ComponentFixture<ApprovedPayementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPayementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPayementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

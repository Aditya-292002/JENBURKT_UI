import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDispatchedDetailsComponent } from './update-dispatched-details.component';

describe('UpdateDispatchedDetailsComponent', () => {
  let component: UpdateDispatchedDetailsComponent;
  let fixture: ComponentFixture<UpdateDispatchedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDispatchedDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDispatchedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

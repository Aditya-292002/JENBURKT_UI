import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCmeComponent } from './print-cme.component';

describe('PrintCmeComponent', () => {
  let component: PrintCmeComponent;
  let fixture: ComponentFixture<PrintCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

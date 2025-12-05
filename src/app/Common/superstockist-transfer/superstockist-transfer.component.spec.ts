import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperstockistTransferComponent } from './superstockist-transfer.component';

describe('SuperstockistTransferComponent', () => {
  let component: SuperstockistTransferComponent;
  let fixture: ComponentFixture<SuperstockistTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperstockistTransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperstockistTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

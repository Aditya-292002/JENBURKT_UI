import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPopupContainerComponent } from './grid-popup-container.component';

describe('GridPopupContainerComponent', () => {
  let component: GridPopupContainerComponent;
  let fixture: ComponentFixture<GridPopupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridPopupContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridPopupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

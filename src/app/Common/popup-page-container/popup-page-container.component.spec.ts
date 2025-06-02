import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPageContainerComponent } from './popup-page-container.component';

describe('PopupPageContainerComponent', () => {
  let component: PopupPageContainerComponent;
  let fixture: ComponentFixture<PopupPageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPageContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

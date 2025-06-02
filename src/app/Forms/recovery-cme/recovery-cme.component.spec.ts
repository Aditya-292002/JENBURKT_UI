import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryCmeComponent } from './recovery-cme.component';

describe('RecoveryCmeComponent', () => {
  let component: RecoveryCmeComponent;
  let fixture: ComponentFixture<RecoveryCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

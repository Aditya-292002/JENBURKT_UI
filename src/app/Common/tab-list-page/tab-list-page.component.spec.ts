import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabListPageComponent } from './tab-list-page.component';

describe('TabListPageComponent', () => {
  let component: TabListPageComponent;
  let fixture: ComponentFixture<TabListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

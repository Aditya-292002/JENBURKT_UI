import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCmeComponent } from './post-cme.component';

describe('PostCmeComponent', () => {
  let component: PostCmeComponent;
  let fixture: ComponentFixture<PostCmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

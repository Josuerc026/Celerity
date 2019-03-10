import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChallengeComponent } from './single-challenge.component';

describe('SingleChallengeComponent', () => {
  let component: SingleChallengeComponent;
  let fixture: ComponentFixture<SingleChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

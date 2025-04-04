import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicScoresComponent } from './public-scores.component';

describe('PublicScoresComponent', () => {
  let component: PublicScoresComponent;
  let fixture: ComponentFixture<PublicScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicScoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

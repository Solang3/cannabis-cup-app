import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLandingComponent } from './event-landing.component';

describe('EventLandingComponent', () => {
  let component: EventLandingComponent;
  let fixture: ComponentFixture<EventLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

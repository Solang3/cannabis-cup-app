import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorDashboardComponent } from './competitor-dashboard.component';

describe('CompetitorDashboardComponent', () => {
  let component: CompetitorDashboardComponent;
  let fixture: ComponentFixture<CompetitorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeDashboardComponent } from './judge-dashboard.component';

describe('JudgeDashboardComponent', () => {
  let component: JudgeDashboardComponent;
  let fixture: ComponentFixture<JudgeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JudgeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

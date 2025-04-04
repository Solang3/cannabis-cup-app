import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeRedirectComponent } from './me-redirect.component';

describe('MeRedirectComponent', () => {
  let component: MeRedirectComponent;
  let fixture: ComponentFixture<MeRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

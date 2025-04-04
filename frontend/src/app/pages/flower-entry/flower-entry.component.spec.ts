import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerEntryComponent } from './flower-entry.component';

describe('FlowerEntryComponent', () => {
  let component: FlowerEntryComponent;
  let fixture: ComponentFixture<FlowerEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowerEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

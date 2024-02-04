import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputMonitorComponent } from './input-output-monitor.component';

describe('InputOutputMonitorComponent', () => {
  let component: InputOutputMonitorComponent;
  let fixture: ComponentFixture<InputOutputMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOutputMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

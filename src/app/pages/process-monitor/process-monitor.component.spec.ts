import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMonitorComponent } from './process-monitor.component';

describe('ProcessMonitorComponent', () => {
  let component: ProcessMonitorComponent;
  let fixture: ComponentFixture<ProcessMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

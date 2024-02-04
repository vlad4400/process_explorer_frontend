import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemServicesMonitorComponent } from './system-services-monitor.component';

describe('SystemServicesMonitorComponent', () => {
  let component: SystemServicesMonitorComponent;
  let fixture: ComponentFixture<SystemServicesMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemServicesMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemServicesMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkActivityAnalysisComponent } from './network-activity-analysis.component';

describe('NetworkActivityAnalysisComponent', () => {
  let component: NetworkActivityAnalysisComponent;
  let fixture: ComponentFixture<NetworkActivityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkActivityAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkActivityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

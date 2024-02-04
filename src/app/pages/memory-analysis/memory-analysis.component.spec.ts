import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryAnalysisComponent } from './memory-analysis.component';

describe('MemoryAnalysisComponent', () => {
  let component: MemoryAnalysisComponent;
  let fixture: ComponentFixture<MemoryAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

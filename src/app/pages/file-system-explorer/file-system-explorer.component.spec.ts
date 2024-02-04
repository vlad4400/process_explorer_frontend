import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSystemExplorerComponent } from './file-system-explorer.component';

describe('FileSystemExplorerComponent', () => {
  let component: FileSystemExplorerComponent;
  let fixture: ComponentFixture<FileSystemExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSystemExplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSystemExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

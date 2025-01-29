import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportconfsetupComponent } from './import-exportconfsetup.component';

describe('ImportExportconfsetupComponent', () => {
  let component: ImportExportconfsetupComponent;
  let fixture: ComponentFixture<ImportExportconfsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportExportconfsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportExportconfsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

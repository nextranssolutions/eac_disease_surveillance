import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentRequirementsComponent } from './app-document-requirements.component';

describe('AppDocumentRequirementsComponent', () => {
  let component: AppDocumentRequirementsComponent;
  let fixture: ComponentFixture<AppDocumentRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentRequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDocumentRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

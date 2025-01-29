import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentTypesComponent } from './app-document-types.component';

describe('AppDocumentTypesComponent', () => {
  let component: AppDocumentTypesComponent;
  let fixture: ComponentFixture<AppDocumentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

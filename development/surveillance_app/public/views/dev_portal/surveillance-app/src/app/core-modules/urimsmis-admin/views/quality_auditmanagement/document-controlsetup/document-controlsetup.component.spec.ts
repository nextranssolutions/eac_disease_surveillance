import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentControlsetupComponent } from './document-controlsetup.component';

describe('DocumentControlsetupComponent', () => {
  let component: DocumentControlsetupComponent;
  let fixture: ComponentFixture<DocumentControlsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentControlsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentControlsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

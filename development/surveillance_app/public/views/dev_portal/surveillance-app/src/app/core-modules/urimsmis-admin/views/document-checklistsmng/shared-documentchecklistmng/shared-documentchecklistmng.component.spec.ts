import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDocumentchecklistmngComponent } from './shared-documentchecklistmng.component';

describe('SharedDocumentchecklistmngComponent', () => {
  let component: SharedDocumentchecklistmngComponent;
  let fixture: ComponentFixture<SharedDocumentchecklistmngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDocumentchecklistmngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedDocumentchecklistmngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

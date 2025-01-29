import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPublicationTypesComponent } from './app-publication-types.component';

describe('AppPublicationTypesComponent', () => {
  let component: AppPublicationTypesComponent;
  let fixture: ComponentFixture<AppPublicationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPublicationTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppPublicationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

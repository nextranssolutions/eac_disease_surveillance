import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppApplicationtypesComponent } from './app-applicationtypes.component';

describe('AppApplicationtypesComponent', () => {
  let component: AppApplicationtypesComponent;
  let fixture: ComponentFixture<AppApplicationtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppApplicationtypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppApplicationtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

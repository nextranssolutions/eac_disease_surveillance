import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSystemprocessesComponent } from './app-systemprocesses.component';

describe('AppSystemprocessesComponent', () => {
  let component: AppSystemprocessesComponent;
  let fixture: ComponentFixture<AppSystemprocessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSystemprocessesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSystemprocessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

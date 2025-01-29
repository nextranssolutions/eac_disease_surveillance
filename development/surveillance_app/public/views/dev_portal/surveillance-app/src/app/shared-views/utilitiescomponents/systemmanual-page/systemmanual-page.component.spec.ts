import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemmanualPageComponent } from './systemmanual-page.component';

describe('SystemmanualPageComponent', () => {
  let component: SystemmanualPageComponent;
  let fixture: ComponentFixture<SystemmanualPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemmanualPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemmanualPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUnisectionComponent } from './footer-unisection.component';

describe('FooterUnisectionComponent', () => {
  let component: FooterUnisectionComponent;
  let fixture: ComponentFixture<FooterUnisectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterUnisectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterUnisectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

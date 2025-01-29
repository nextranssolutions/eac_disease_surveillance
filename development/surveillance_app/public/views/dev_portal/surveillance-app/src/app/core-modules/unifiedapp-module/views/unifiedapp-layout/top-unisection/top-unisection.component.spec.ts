import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUnisectionComponent } from './top-unisection.component';

describe('TopUnisectionComponent', () => {
  let component: TopUnisectionComponent;
  let fixture: ComponentFixture<TopUnisectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUnisectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopUnisectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

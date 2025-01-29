import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmpProductlineComponent } from './gmp-productline.component';

describe('GmpProductlineComponent', () => {
  let component: GmpProductlineComponent;
  let fixture: ComponentFixture<GmpProductlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmpProductlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmpProductlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

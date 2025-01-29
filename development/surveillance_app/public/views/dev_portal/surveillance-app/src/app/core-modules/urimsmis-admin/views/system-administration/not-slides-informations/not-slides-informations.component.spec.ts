import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSlidesInformationsComponent } from './not-slides-informations.component';

describe('NotSlidesInformationsComponent', () => {
  let component: NotSlidesInformationsComponent;
  let fixture: ComponentFixture<NotSlidesInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotSlidesInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotSlidesInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSectionsComponent } from './app-sections.component';

describe('AppSectionsComponent', () => {
  let component: AppSectionsComponent;
  let fixture: ComponentFixture<AppSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

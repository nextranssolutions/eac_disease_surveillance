import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGenericnamesComponent } from './app-genericnames.component';

describe('AppGenericnamesComponent', () => {
  let component: AppGenericnamesComponent;
  let fixture: ComponentFixture<AppGenericnamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppGenericnamesComponent]
    });
    fixture = TestBed.createComponent(AppGenericnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoriiesComponent } from './view-categoriies.component';

describe('ViewCategoriiesComponent', () => {
  let component: ViewCategoriiesComponent;
  let fixture: ComponentFixture<ViewCategoriiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCategoriiesComponent]
    });
    fixture = TestBed.createComponent(ViewCategoriiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

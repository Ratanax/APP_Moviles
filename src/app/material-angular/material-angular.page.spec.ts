import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialAngularPage } from './material-angular.page';

describe('MaterialAngularPage', () => {
  let component: MaterialAngularPage;
  let fixture: ComponentFixture<MaterialAngularPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAngularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

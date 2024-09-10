import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FondoQRPage } from './fondo-qr.page';

describe('FondoQRPage', () => {
  let component: FondoQRPage;
  let fixture: ComponentFixture<FondoQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FondoQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BILBAOPage } from './bilbao.page';

describe('BILBAOPage', () => {
  let component: BILBAOPage;
  let fixture: ComponentFixture<BILBAOPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BILBAOPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

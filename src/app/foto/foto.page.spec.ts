import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotoPage } from './foto.page';
import { IonicModule } from '@ionic/angular';

describe('FotoPage', () => {
  let component: FotoPage;
  let fixture: ComponentFixture<FotoPage>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});








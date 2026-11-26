import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcentracionComponent } from './concentracion-component';

describe('ConcentracionComponent', () => {
  let component: ConcentracionComponent;
  let fixture: ComponentFixture<ConcentracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcentracionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcentracionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

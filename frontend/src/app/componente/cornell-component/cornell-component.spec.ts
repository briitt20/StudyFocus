import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CornellComponent } from './cornell-component';

describe('CornellComponent', () => {
  let component: CornellComponent;
  let fixture: ComponentFixture<CornellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CornellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CornellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

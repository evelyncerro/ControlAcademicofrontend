import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasPage } from './asignaturas-page';

describe('AsignaturasPage', () => {
  let component: AsignaturasPage;
  let fixture: ComponentFixture<AsignaturasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

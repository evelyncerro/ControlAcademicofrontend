import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosSemana } from './horarios-semana';

describe('HorariosSemana', () => {
  let component: HorariosSemana;
  let fixture: ComponentFixture<HorariosSemana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosSemana]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariosSemana);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

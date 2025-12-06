import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormModal } from './usuario-form-modal';

describe('UsuarioFormModal', () => {
  let component: UsuarioFormModal;
  let fixture: ComponentFixture<UsuarioFormModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

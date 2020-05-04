import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { NeeddonationUpdateComponent } from 'app/entities/needdonation/needdonation-update.component';
import { NeeddonationService } from 'app/entities/needdonation/needdonation.service';
import { Needdonation } from 'app/shared/model/needdonation.model';

describe('Component Tests', () => {
  describe('Needdonation Management Update Component', () => {
    let comp: NeeddonationUpdateComponent;
    let fixture: ComponentFixture<NeeddonationUpdateComponent>;
    let service: NeeddonationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [NeeddonationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NeeddonationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NeeddonationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NeeddonationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Needdonation(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Needdonation();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

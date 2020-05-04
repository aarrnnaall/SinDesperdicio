import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SinDesperdicioTestModule } from '../../../test.module';
import { DonationsUpdateComponent } from 'app/entities/donations/donations-update.component';
import { DonationsService } from 'app/entities/donations/donations.service';
import { Donations } from 'app/shared/model/donations.model';

describe('Component Tests', () => {
  describe('Donations Management Update Component', () => {
    let comp: DonationsUpdateComponent;
    let fixture: ComponentFixture<DonationsUpdateComponent>;
    let service: DonationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [DonationsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DonationsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DonationsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DonationsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Donations(123);
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
        const entity = new Donations();
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

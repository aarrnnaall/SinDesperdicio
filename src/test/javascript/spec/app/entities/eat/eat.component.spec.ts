import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SinDesperdicioTestModule } from '../../../test.module';
import { EatComponent } from 'app/entities/eat/eat.component';
import { EatService } from 'app/entities/eat/eat.service';
import { Eat } from 'app/shared/model/eat.model';

describe('Component Tests', () => {
  describe('Eat Management Component', () => {
    let comp: EatComponent;
    let fixture: ComponentFixture<EatComponent>;
    let service: EatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [EatComponent]
      })
        .overrideTemplate(EatComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EatComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EatService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Eat(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eats && comp.eats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

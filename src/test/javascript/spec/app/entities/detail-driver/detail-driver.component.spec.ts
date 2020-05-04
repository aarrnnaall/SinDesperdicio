import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SinDesperdicioTestModule } from '../../../test.module';
import { DetailDriverComponent } from 'app/entities/detail-driver/detail-driver.component';
import { DetailDriverService } from 'app/entities/detail-driver/detail-driver.service';
import { DetailDriver } from 'app/shared/model/detail-driver.model';

describe('Component Tests', () => {
  describe('DetailDriver Management Component', () => {
    let comp: DetailDriverComponent;
    let fixture: ComponentFixture<DetailDriverComponent>;
    let service: DetailDriverService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SinDesperdicioTestModule],
        declarations: [DetailDriverComponent]
      })
        .overrideTemplate(DetailDriverComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DetailDriverComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DetailDriverService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DetailDriver(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.detailDrivers && comp.detailDrivers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

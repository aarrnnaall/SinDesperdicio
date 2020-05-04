import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NeeddonationService } from 'app/entities/needdonation/needdonation.service';
import { INeeddonation, Needdonation } from 'app/shared/model/needdonation.model';
import { TipoDuration } from 'app/shared/model/enumerations/tipo-duration.model';

describe('Service Tests', () => {
  describe('Needdonation Service', () => {
    let injector: TestBed;
    let service: NeeddonationService;
    let httpMock: HttpTestingController;
    let elemDefault: INeeddonation;
    let expectedResult: INeeddonation | INeeddonation[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NeeddonationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Needdonation(
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        TipoDuration.Continua,
        'AAAAAAA',
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datestart: currentDate.format(DATE_TIME_FORMAT),
            dateend: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Needdonation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datestart: currentDate.format(DATE_TIME_FORMAT),
            dateend: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datestart: currentDate,
            dateend: currentDate
          },
          returnedFromService
        );

        service.create(new Needdonation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Needdonation', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            datestart: currentDate.format(DATE_TIME_FORMAT),
            dateend: currentDate.format(DATE_TIME_FORMAT),
            availabilityday: 'BBBBBB',
            availabilitytime: 'BBBBBB',
            latitud: 1,
            longitud: 1,
            duration: 'BBBBBB',
            intervalduration: 'BBBBBB',
            cantpeople: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datestart: currentDate,
            dateend: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Needdonation', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            datestart: currentDate.format(DATE_TIME_FORMAT),
            dateend: currentDate.format(DATE_TIME_FORMAT),
            availabilityday: 'BBBBBB',
            availabilitytime: 'BBBBBB',
            latitud: 1,
            longitud: 1,
            duration: 'BBBBBB',
            intervalduration: 'BBBBBB',
            cantpeople: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datestart: currentDate,
            dateend: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Needdonation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

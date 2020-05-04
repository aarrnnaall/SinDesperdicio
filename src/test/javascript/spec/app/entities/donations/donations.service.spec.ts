import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DonationsService } from 'app/entities/donations/donations.service';
import { IDonations, Donations } from 'app/shared/model/donations.model';
import { TipoEat } from 'app/shared/model/enumerations/tipo-eat.model';
import { TipoDrive } from 'app/shared/model/enumerations/tipo-drive.model';

describe('Service Tests', () => {
  describe('Donations Service', () => {
    let injector: TestBed;
    let service: DonationsService;
    let httpMock: HttpTestingController;
    let elemDefault: IDonations;
    let expectedResult: IDonations | IDonations[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DonationsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Donations(0, 'AAAAAAA', currentDate, 0, 0, 'AAAAAAA', 'AAAAAAA', TipoEat.Cargado, TipoDrive.Cargado);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Donations', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        service.create(new Donations()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Donations', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
            latitud: 1,
            longitud: 1,
            availabilityday: 'BBBBBB',
            availabilitytime: 'BBBBBB',
            statuseat: 'BBBBBB',
            statusdrive: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Donations', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
            latitud: 1,
            longitud: 1,
            availabilityday: 'BBBBBB',
            availabilitytime: 'BBBBBB',
            statuseat: 'BBBBBB',
            statusdrive: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Donations', () => {
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

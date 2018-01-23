
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { generatePowers } from '../models/power.model';
import { PowersService } from './powers.service';

describe('PowersService', () => {
  let powersService: PowersService;
  let httpMock: HttpTestingController;

  let powers = generatePowers();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        PowersService
      ]
    });

    powersService = TestBed.get(PowersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create a power', (done) => {
    const power = {
      name: 'Ice Breath'
    };

    const _id = powers[powers.length - 1].id++;

    powersService.createPower(power)
      .subscribe(newPower => {
        expect(newPower).toEqual({
          ...power,
          id: _id,
        });
        done();
      });
    const request = httpMock.expectOne(`${powersService.BASE_URL}/powers`);
    request.flush({
      ...power,
      id: _id
    });
  });

  it('should delete a power', (done) => {
    const last = powers[powers.length - 1];

    powersService.deletePower(last)
      .subscribe(lastPower => {
        expect(lastPower).toEqual(last);
        done();
      });
    const request = httpMock.expectOne(`${powersService.BASE_URL}/powers/${last.id}`);
    request.flush(null);
  });

  it('should get a power', (done) => {
    const first = powers[0];
    powersService.getPower(first.id)
      .subscribe(gottenPower => {
        expect(gottenPower).toEqual(first);
        done();
      });

    const request = httpMock.expectOne(`${powersService.BASE_URL}/powers/${first.id}`);
    request.flush(first);
  });

  it('should get all powers', (done) => {
    powersService.getPowers()
      .subscribe(gottenPowers => {
        expect(gottenPowers).toEqual(powers);
        done();
      });

    const request = httpMock.expectOne(`${powersService.BASE_URL}/powers`);
    request.flush(powers);
  });

  it('should update a power', (done) => {
    const first = powers[0];
    const updatedPower = {...first, name: 'Dance Moves'};

    powersService.updatePower(updatedPower)
      .subscribe(power => {
        expect(power).toEqual(updatedPower);
        done();
      });

    const request = httpMock.expectOne(`${powersService.BASE_URL}/powers/${first.id}`);
    request.flush(updatedPower);
  });
});

import { Injectable } from '@angular/core';
import { MarvelService } from './marvel.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Character } from '../models/character.model';
import { MarvelResponse } from '../models/marvel-response.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CharactersService extends MarvelService {

  constructor(private httpClient: HttpClient){
    super();
  }

  getCharacters(nameStartsWith?: string): Observable<Array<Character>>{
    return this.httpClient.get<MarvelResponse<Character>>(`${this.BASE_URL}/characters`, {
      params: new HttpParams().set('nameStartsWith', nameStartsWith)
    })
      .pipe(
        //for every marvel response map it out and return just the results
        map(response => response.data.results)
      )
  }
}

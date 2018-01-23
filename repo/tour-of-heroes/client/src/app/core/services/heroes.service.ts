import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Hero } from '../models/hero.model';

//Injectable will look for a token HeroesService, tell the dependency injector this class is now a token to be injected
@Injectable()
export class HeroesService extends BaseService {

  constructor(private httpClient: HttpClient) {
    //super invokes the parent constructor, it is required when you extend a service
    super();
  }

  getHeroes(): Observable<Array<Hero>> {
    //backticks called string interpolation
    return this.httpClient.get<Array<Hero>>(`${this.BASE_URL}/heroes`)
  }

  getHero(id: string): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this.BASE_URL}/heroes/${id}`);
  }

  deleteHero(hero: Hero): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/heroes/${hero.id}`)
  }

  createHero(hero:Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.BASE_URL}/heroes`, hero)
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.put<Hero>(`${this.BASE_URL}/heroes/${hero.id}`, hero)
  }

}

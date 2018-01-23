import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MarvelResponse } from '../models/marvel-response.model';
import { Observable } from 'rxjs/Observable';
import { Character } from '../models/character.model';
import { environment } from '../../../environments/environment';
import { MarvelService } from '../services/marvel.service';
import { Injectable } from '@angular/core';

type responseTypes = Character

//we need injectable if we are going to inject things into our class
@Injectable()
export class MarvelInterceptor implements HttpInterceptor {

  constructor(private marvelService: MarvelService) {
  }

  //this is an an observanble of an http event of a response of a response type
  //interceptor is a class that every request goes through, it mutates the request
  //we get the request {HttpRequest) and we clone the request, add an addtional parameter and pass it along
  intercept(req: HttpRequest<MarvelResponse<responseTypes>>, next: HttpHandler): Observable<HttpEvent<MarvelResponse<responseTypes>>> {

    if (req.url.indexOf(this.marvelService.BASE_URL) === 0) {
      req = req.clone({
        //here we are setting a new param
        params: req.params.set('apikey', environment.marvel.public)
      });
    }

    return next.handle(req)
  }

}

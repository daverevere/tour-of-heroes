import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";
import { catchError, map, share, switchMap } from "rxjs/operators";
import "rxjs/add/observable/of";

import { HeroesService } from "../../../core/services/heroes.service";
import { Hero } from "../../../core/models/hero.model";
import { Power } from "../../../core/models/power.model";
import { PowersService } from "../../../core/services/powers.service";

@Component({
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  hero: Observable<Hero>;

  powers: Observable<Array<Power>>;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private powersService: PowersService,
              private router: Router) {
  }

  onDelete(hero: Hero) {
    this.heroesService.deleteHero(hero)
      .subscribe(() => this.router.navigate(['/heroes']));
  }

  ngOnInit() {
    this.hero = this.activatedRoute.paramMap
    //pipe is a new method for Observables that replaces chaining methods on observables. Now you just put all your operators as parameters in your pipe
      .pipe(
        switchMap(paramMap => this.heroesService.getHero(paramMap.get('id'))),
        //share operator shares the initial value emitted out of an observable,
        // so now instead of multiple sources subscribing to the observable, everything shares the one value, it's just one subscription.
        //this way there are not multiple http requests.  It's just the one observable making the request and sharing the value with everyone
        share()
      );
    this.powers = this.hero
      .pipe(
        //with forkjoin, if anything goes bad on an inner observable, it breaks. So we must catch the error and return the observable.
        switchMap(hero => forkJoin(
          hero.powers.map(power => {
            return this.powersService.getPower(power)
              .pipe(
                catchError(error => {
                  console.error(error);
                  //of operator creates an observable of however number of values
                  return Observable.of(undefined);
                })
              );
          })
        )),
        //map is getting the powers array, on that array it's going to return any power that is not undefined
        map(powers => powers.filter(power => power !== undefined))
      );
  }

}

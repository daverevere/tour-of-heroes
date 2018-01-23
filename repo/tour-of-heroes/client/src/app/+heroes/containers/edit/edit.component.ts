import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../../core/services/heroes.service';
import { PowersService } from '../../../core/services/powers.service';
import { Observable } from 'rxjs/Observable';
import { Power } from '../../../core/models/power.model';
import { Hero } from '../../../core/models/hero.model';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  hero: Observable<Hero>;
  powers: Observable<Array<Power>>;

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private powersService: PowersService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit() {

    this.hero = this.activatedRoute.paramMap
      .pipe(
        switchMap(paramMap => this.heroesService.getHero(paramMap.get('id')))
      );

    this.powers = this.powersService.getPowers();

  }

  onPowerChange(hero: Hero) {
    this.heroesService.updateHero(hero)
      .subscribe(()=> this.matSnackBar.open('Hero Saved', '', {
        duration: 2000
      }))
  }

}

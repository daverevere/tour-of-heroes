import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../../core/services/heroes.service';
import { Hero } from '../../../core/models/hero.model';
import { Observable } from 'rxjs/Observable';
import { AddHeroComponent } from '../../dialogs/add-hero/add-hero.component';
import { MatDialog } from '@angular/material';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  heroes: Observable<Array<Hero>>;

  constructor(private heroesService: HeroesService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.heroes = this.heroesService.getHeroes();
  }

  delete(hero: Hero) {
    this.heroesService.deleteHero(hero)
      .subscribe(() => this.heroes = this.heroesService.getHeroes())
  }

  onAdd() {
    this.matDialog.open(AddHeroComponent);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';

@Component({
  selector: 'app-hero-actions',
  templateUrl: './hero-actions.component.html',
  styleUrls: ['./hero-actions.component.scss']
})
export class HeroActionsComponent {

  @Input() hero: Hero;

  @Output() deleteChange = new EventEmitter<Hero>();

  constructor() {
  }


}

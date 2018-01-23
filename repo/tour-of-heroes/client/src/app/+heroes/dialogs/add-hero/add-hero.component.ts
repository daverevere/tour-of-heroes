import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatDialogRef, MatSnackBar } from '@angular/material';
import { Power } from '../../../core/models/power.model';
import { HeroesService } from '../../../core/services/heroes.service';
import { Hero } from '../../../core/models/hero.model';
import { PowersService } from '../../../core/services/powers.service';
import { Observable } from 'rxjs/Observable';
import { Character } from '../../../core/models/character.model';
import { CharactersService } from '../../../core/services/characters.service';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {

  characters: Observable<Array<Character>>;

  @Input() hero: Hero;
  powers: Observable<Array<Power>>;
  private selectedPowers: Array<Power> = [];
  private character: Character;

  form: FormGroup;

//matDialogRef gives us reference to a specific dialog
  constructor(private powersService: PowersService,
              private heroesService: HeroesService,
              private matDialogRef: MatDialogRef<AddHeroComponent>,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private charactersService: CharactersService) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.powers = this.powersService.getPowers();

    // this.characters = this.charactersService.getCharacters();
    this.characters = this.form.get('name')
    //valueChanges is an observable that emits an event every time the form changes
      .valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => this.filter(value))
      )
  }

  displayCharacterAutocomplete(character: Character): string {
    if (character) {
      return character.name;
    } else {
      return ''
    }
  }

  filter(name: string): Observable<Array<Character>> {
    if (name.length === 0) {
      return Observable.of([])
    }
    return this.charactersService.getCharacters(name);
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    this.heroesService.createHero({
      // ...this.form.value,
      character: this.character,
      powers: this.selectedPowers.map(power => power.id)
    }).subscribe(()=> this.close());

    // const hero: Hero = this.form.value;
    // hero.character = this.character;
    // hero.powers = this.selectedPowers.map(power =< power.id);
  }

  //host listener lets us listen to global events that happen
  @HostListener('keydown.esc')
  onEsc() {
    this.matDialogRef.close();
  }

  close() {
    this.matDialogRef.close();
  }

  onPowerChange(powers: Power[]) {
    this.selectedPowers = powers;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.character = event.option.value;
  }

}

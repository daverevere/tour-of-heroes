import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Power } from '../../../core/models/power.model';
import { Hero } from '../../../core/models/hero.model';

@Component({
  selector: 'app-power-chip-list',
  templateUrl: './power-chip-list.component.html',
  styleUrls: ['./power-chip-list.component.scss']
})
export class PowerChipListComponent implements OnChanges {

  @Input() powers: Power[];
  @Input() hero: Hero;
  @Output() powerChange = new EventEmitter<Array<Power>>();

  selectedPowers: Power[] = [];

  constructor() {
  }

  ngOnChanges() {
    if (this.hero && this.powers) {
      this.selectedPowers = this.powers.filter(power => this.hero.powers.indexOf(power.id) > -1)
    }
  }

  isSelected(power: Power) {
    if(!this.selectedPowers) {
      return false;
    } else {
      return this.selectedPowers.indexOf(power) > -1
    }
  }

  togglePower(power: Power) {
    const powerIndex = this.selectedPowers.indexOf(power);
    if(powerIndex > -1){
      this.selectedPowers.splice(powerIndex, 1)
    } else {
      this.selectedPowers.push(power);
    }
    this.powerChange.emit(this.selectedPowers)
  }

}

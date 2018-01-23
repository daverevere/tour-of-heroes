import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Power } from '../../../core/models/power.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-edit-power',
  templateUrl: './edit-power.component.html',
  styleUrls: ['./edit-power.component.scss']
})
export class EditPowerComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() power: Power;
  @Output() powerChange =new EventEmitter<Power>();

  //constructor fires first, then ngOnChanges, then ngOnInit

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  ngOnInit() {

    this.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.powerChange.emit({
          //spread out all the powers
          ...this.power,
          //override those powers with the spread of my form value changes
          ...value
        });
      });
  }

  ngOnChanges() {
    if (this.power) {
      this.populateForm();
    }
  }

  populateForm() {

    this.form.patchValue(this.power, {
      emitEvent: false
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

}

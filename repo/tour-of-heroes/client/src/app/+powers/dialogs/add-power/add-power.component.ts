import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { PowersService } from '../../../core/services/powers.service';
import { Power } from '../../../core/models/power.model';

@Component({
  templateUrl: './add-power.component.html',
  styleUrls: ['./add-power.component.scss']
})
export class AddPowerComponent implements OnInit {

  form: FormGroup;

//matDialogRef gives us reference to a specific dialog
  constructor(private powersService: PowersService, private matDialogRef: MatDialogRef<AddPowerComponent>, private fb: FormBuilder, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  onAdd() {
    //putting a generic in front of the value is typecasting. This object is now cast to be a power object
    const power = <Power>this.form.value;
    //we have to subscribe to this to fire it off, otherwise it's just a cold observable
    this.powersService.createPower(power)
      .subscribe(() => {
        this.matSnackBar.open('Power Created', '', {
          duration: 2000
        });
        this.matDialogRef.close();
      });
  }

  //host listener lets us listen to global events that happen
  @HostListener('keydown.esc')
  onEsc() {
    this.matDialogRef.close();
  }

  close() {
    this.matDialogRef.close();
  }

}

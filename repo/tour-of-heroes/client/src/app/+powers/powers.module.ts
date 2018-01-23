import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './containers/index/index.component';
import { PowersRoutingModule } from './powers-routing.module';
import { PowersComponent } from './components/powers/powers.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditComponent } from './containers/edit/edit.component';
import { EditPowerComponent } from './components/edit-power/edit-power.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPowerComponent } from './dialogs/add-power/add-power.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import * as fromPowers from "../state/powers/reducers"

@NgModule({
  imports: [
    CommonModule,
    PowersRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    SharedModule
  ],
  //defines components that should be bootstrapped when the application is bootstrapped
  entryComponents: [
    AddPowerComponent
  ],
  declarations: [IndexComponent, PowersComponent, EditComponent, EditPowerComponent, AddPowerComponent]
})
export class PowersModule {
}

//if you get a console error that says 'it isn't a known property', that is a clue that there is something missing in the module configuration

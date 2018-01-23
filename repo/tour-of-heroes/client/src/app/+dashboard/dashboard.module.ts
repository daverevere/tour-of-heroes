import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

import { IndexComponent } from './containers/index/index.component';
import {DashboardRoutingModule} from './dashboard-routing.modules';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [IndexComponent]
})
export class DashboardModule { }

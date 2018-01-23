import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import {
  MatButtonModule, MatIconModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';

const components = [
  LayoutComponent,
  DialogHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }

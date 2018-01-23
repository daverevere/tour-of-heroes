import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexComponent } from './containers/index/index.component';
import { EditComponent } from './containers/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
    path: ':id',
    component: EditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PowersRoutingModule {

}

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    //if I come into my app with no path(just a slash), i'm going to redirect to dashboard)
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    //lazy loading
    //we give it the path to the module and then the name of the module
    loadChildren: 'app/+dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'heroes',
    loadChildren: 'app/+heroes/heroes.module#HeroesModule'
  },
  {
    path: 'powers',
    loadChildren: 'app/+powers/powers.module#PowersModule'
  }
];

@NgModule({
  //forRoot is only used in the app module, this is where it starts the tree (of routes)
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

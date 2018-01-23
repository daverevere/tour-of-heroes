import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HeroesService } from './services/heroes.service';

// import { HeroesService } from "./services/heroes.service";
import { CharactersService } from "./services/characters.service";
import { PowersService } from "./services/powers.service";
import { MarvelInterceptor } from './interceptors/marvel.interceptor';
import { MarvelService } from './services/marvel.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  // declarations: [],
  providers: [
    CharactersService,
    MarvelService,
    HeroesService,
    {
      //provide angular's array of interceptor tokens
      provide: HTTP_INTERCEPTORS,
      //tell module which interceptor to use
      useClass: MarvelInterceptor,
      //specify one or many interceptors
      multi: true
    },
    PowersService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }

}

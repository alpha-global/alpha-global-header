import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './demo.component';

import { AlphaGlobalHeaderModule } from '../../../../src/angular/src';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlphaGlobalHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './demo.component';

import { AlphaGlobalHeaderModule } from '../../../../src/angular';

/**
 * Main App Routes
 */
const routes:Routes = [


	{
		path:'',
		component:AppComponent,
		data : {
        	hideHeader:true
    	}
	}
]

@Component({
  selector : 'app-main',
  template : `
  <router-outlet>

  </router-outlet>
  `
})
export class AppMain {

}

@NgModule({
  declarations: [
    AppComponent,
    AppMain
  ],
  imports: [
    BrowserModule,
    AlphaGlobalHeaderModule,
    RouterModule.forRoot(routes, {

		}),
  ],
  providers: [],
  bootstrap: [AppMain]
})
export class AppModule { }

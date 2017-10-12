import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { AlphaGlobalHeader } from './alpha-global-header.component';

@NgModule( {
	declarations: [
		AlphaGlobalHeader
	],
	exports : [
		AlphaGlobalHeader,
		RouterModule
	],
	imports : [
		CommonModule,
		RouterModule
	]

} )
export class AlphaGlobalHeaderModule {

}

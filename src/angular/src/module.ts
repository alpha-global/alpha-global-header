import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { AlphaGlobalHeader, MenuItem, SubMenu } from './alpha-global-header.component';

@NgModule( {
	declarations: [
		AlphaGlobalHeader,
		MenuItem,
		SubMenu
	],
	exports : [
		AlphaGlobalHeader,
		MenuItem,
		SubMenu,
		RouterModule
	],
	imports : [
		CommonModule,
		RouterModule
	]

} )
export class AlphaGlobalHeaderModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphaGlobalHeader } from './alpha-global-header.component';

@NgModule( {
	declarations: [
		AlphaGlobalHeader
	],
	exports: [
		AlphaGlobalHeader,
	],
	imports: [
		CommonModule,
	]

} )
export class AlphaGlobalHeaderModule { }

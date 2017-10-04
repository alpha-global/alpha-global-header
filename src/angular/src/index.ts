import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlphaGlobalHeader, MenuItem, SubMenu } from './alpha-global-header.component';

@NgModule( {
  	declarations: [
    	AlphaGlobalHeader,MenuItem, SubMenu
	],
	exports : [
		AlphaGlobalHeader, MenuItem, SubMenu
	],
  	imports: [
    	BrowserModule
  	],
  	providers: []
} )
export class AlphaGlobalHeaderModule { }

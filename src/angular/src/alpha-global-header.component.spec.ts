import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlphaGlobalHeader } from './alpha-global-header.component';
import { Router } from '@angular/router';


const routerSpy = jasmine.createSpyObj( 'Router', [ 'navigateByUrl', 'events' ] );

describe( 'AngularGlobalHeaderComponent', () => {
	let component: AlphaGlobalHeader;
	let fixture: ComponentFixture<AlphaGlobalHeader>;

	beforeEach( async( () => {
		TestBed.configureTestingModule( {
			imports: [
				RouterTestingModule
			],
			providers: [
				//	{ provide: Router, useValue: routerSpy }
			],

			declarations: [ AlphaGlobalHeader ]
		} )
			.compileComponents();
	} ) );

	beforeEach( () => {
		fixture = TestBed.createComponent( AlphaGlobalHeader );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () => {
		expect( component ).toBeTruthy();
	} );
	it( 'should tell ROUTER to navigate when hero clicked', () => {

		//heroClick(); // trigger click on first inner <div class="hero">

		// args passed to router.navigateByUrl() spy
		/*const spy = router.navigateByUrl as jasmine.Spy;
		const navArgs = spy.calls.first().args[0];
	  
		// expecting to navigate to id of the component's first hero
		const id = comp.heroes[0].id;
		expect(navArgs).toBe('/heroes/' + id,
		  'should nav to HeroDetail for first hero');
		  */
	} );
} );

import { AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlphaHeader } from './util/menu-component';
export declare class AlphaGlobalHeader implements AfterViewInit {
    private elRef;
    private router;
    header: AlphaHeader;
    home: Array<string>;
    search: boolean;
    searchAction: string;
    languages: Array<any>;
    /**
     * Close menu when clicking on self link
     *
     * @param event
     */
    onClick(event: any): void;
    constructor(elRef: ElementRef, router: Router);
    /**
     * After view and content has been rendered, check the menu widths
     */
    ngAfterViewInit(): void;
}

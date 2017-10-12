import { AfterViewInit, ElementRef } from '@angular/core';
export declare class AlphaGlobalHeader implements AfterViewInit {
    private elRef;
    home: Array<string>;
    search: boolean;
    searchAction: string;
    languages: Array<any>;
    constructor(elRef: ElementRef);
    /**
     * After view and content has been rendered, check the menu widths
     */
    ngAfterViewInit(): void;
}

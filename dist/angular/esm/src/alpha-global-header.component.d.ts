import { AfterContentInit, AfterViewInit, QueryList, ElementRef } from '@angular/core';
export declare class MenuItem {
}
export declare class SubMenu {
}
export declare class AlphaGlobalHeader implements AfterContentInit, AfterViewInit {
    private elRef;
    private _isOpen;
    searchOpenClass: string;
    menuItems: QueryList<ElementRef>;
    subMenus: QueryList<ElementRef>;
    mainMenu: ElementRef;
    home: Array<string>;
    search: boolean;
    searchAction: string;
    languages: Array<any>;
    onMenuClick(event: any): void;
    readonly opened: boolean;
    collapsed: boolean;
    constructor(elRef: ElementRef);
    /**
     * Prepare sub-menu toggles
     */
    ngAfterContentInit(): void;
    /**
     * After view and content has been rendered, check the menu widths
     */
    ngAfterViewInit(): void;
    /**
     * Close Menu
     */
    close(): void;
    /**
     * Open Menu
     */
    open(): void;
    /**
     * Toggle Menu
     */
    toggleMenu(): void;
    /**
     * Toggle Search Input
     */
    toggleSearchInput(): void;
}

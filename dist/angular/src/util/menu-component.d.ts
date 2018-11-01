/**
 * This class is used in polymer and angular to construct and manage the menu
 */
declare class AlphaHeader {
    element: any;
    toolBar: HTMLElement;
    menuContainer: HTMLElement;
    searchArea: HTMLElement;
    isCollapsed: boolean;
    isMinified: boolean;
    state: string;
    options: any;
    defaults: any;
    private canvasContext;
    private _boundResizeFunction;
    private _boundClickFunction;
    private _boundWindowClickFunction;
    constructor(element: any, options: any);
    /**
     * Listen to clicks on the window to close open nav menus
     */
    private onWindowClick;
    /**
     * Handle clicks on different elements
     */
    private onClick;
    /**
     * In angular situations, the page doesn't navigate, so a hovered sub-menu will remain open after a click
     * This will
     */
    private spoofCloseSubMenu;
    /**
     * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
     */
    private getCollapsedMenuWidth;
    /**
     * Move toolbar elements into the toolbar from the menu
     *
     */
    private attachToolbarElements;
    /**
     * Create the language menu
     */
    private createLanguageMenu;
    /**
     * Create an icon to open the search
     */
    private createSearchIcon;
    /**
     * Create the search area
     */
    private createSearchArea;
    /**
     * Attach sub menu toggles
     */
    private attachSubMenuToggles;
    /**
     * Measure the width of text given a font def and custom properties
     */
    private measureWidth;
    /**
     * Get canvas element to measure text with
     */
    private getContext2d;
    open(): void;
    close(): void;
    closeSubMenus(): void;
    openSearch(): void;
    closeSearch(): void;
    /**
     * Remove listeners
     */
    destroy(): void;
    /**
     * Resize function
     */
    check(): void;
    /**
     * Set extra item padding
     */
    private setExtraItemPadding;
}
export { AlphaHeader };

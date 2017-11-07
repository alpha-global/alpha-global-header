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
     * @param event
     */
    private onWindowClick(event);
    /**
     * Handle clicks on different elements
     *
     * @param event
     */
    private onClick(event);
    /**
     * In angular situations, the page doesn't navigate, so a hovered sub-menu will remain open after a click
     * This will
     * @param element
     */
    private spoofCloseSubMenu(element);
    /**
     * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
     */
    private getCollapsedMenuWidth(options);
    /**
     * Move toolbar elements into the toolbar from the menu
     *
     */
    private attachToolbarElements();
    /**
     * Create the language menu
     */
    private createLanguageMenu(extraClass?);
    /**
     * Create an icon to open the search
     */
    private createSearchIcon();
    /**
     * Create the search area
     */
    private createSearchArea();
    /**
     * Attach sub menu toggles
     */
    private attachSubMenuToggles();
    /**
     * Measure the width of text given a font def and custom properties
     *
     * @param {*} text
     * @param {*} font
     * @param {*} overwrites
     */
    private measureWidth(text, font, overwrites?);
    /**
     * Get canvas element to measure text with
     *
     * @param {*} font
     */
    private getContext2d(font);
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
    private setExtraItemPadding();
}
export { AlphaHeader };

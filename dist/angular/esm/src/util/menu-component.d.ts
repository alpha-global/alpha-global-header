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
    constructor(element: any, options: any);
    /**
     * Handle clicks on different elements
     *
     * @param event
     */
    private onClick(event);
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
    private createLanguageMenu();
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
    open(): void;
    close(): void;
    openSearch(): void;
    closeSearch(): void;
    /**
     * Resize function
     */
    check(): void;
}
export { AlphaHeader };

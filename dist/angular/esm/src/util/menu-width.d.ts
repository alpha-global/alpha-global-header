/**
 * Go through each direct children of the ul menu container, measure the required text for each element plus some padding
 */
declare function getMinMenuWidth(menuContainer: any, options: any): number;
/**
 * Register a nav menu to check it's required size on window resize
 * @param {*} menu
 * @param {*} options
 */
declare function registerMenu(menu: any, options: any): {
    start: () => void;
    stop: () => void;
    check: () => void;
};
export { getMinMenuWidth, registerMenu };

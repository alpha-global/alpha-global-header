import { Component, Input, Directive, ViewEncapsulation, HostBinding, ContentChildren, ViewChild, ElementRef, HostListener } from '@angular/core';
import { registerMenu } from './util/menu-width';
var $htmlClasses = window.document.documentElement.classList;
var MenuItem = /** @class */ (function () {
    function MenuItem() {
    }
    MenuItem.decorators = [
        { type: Directive, args: [{ selector: 'li' },] },
    ];
    /** @nocollapse */
    MenuItem.ctorParameters = function () { return []; };
    return MenuItem;
}());
export { MenuItem };
var SubMenu = /** @class */ (function () {
    function SubMenu() {
    }
    SubMenu.decorators = [
        { type: Directive, args: [{ selector: 'ul' },] },
    ];
    /** @nocollapse */
    SubMenu.ctorParameters = function () { return []; };
    return SubMenu;
}());
export { SubMenu };
var AlphaGlobalHeader = /** @class */ (function () {
    function AlphaGlobalHeader(elRef) {
        this.elRef = elRef;
    }
    AlphaGlobalHeader.prototype.onMenuClick = function (event) {
        if (event.target.classList.contains('sub-menu-toggle')) {
            event.target.parentNode.classList.toggle('open');
        }
    };
    Object.defineProperty(AlphaGlobalHeader.prototype, "opened", {
        get: function () {
            return this._isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlphaGlobalHeader.prototype, "collapsed", {
        set: function (value) {
            if (value) {
                this.elRef.nativeElement.classList.add('collapsed');
            }
            else {
                this.elRef.nativeElement.classList.remove('collapsed');
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Prepare sub-menu toggles
     */
    AlphaGlobalHeader.prototype.ngAfterContentInit = function () {
        this.subMenus
            .map(function (elRef) { return elRef.nativeElement; })
            .forEach(function (subMenu) {
            var tog = document.createElement('span');
            tog.classList.add('sub-menu-toggle');
            subMenu.parentNode.insertBefore(tog, subMenu);
        });
    };
    /**
     * After view and content has been rendered, check the menu widths
     */
    AlphaGlobalHeader.prototype.ngAfterViewInit = function () {
        var _this = this;
        // use our common menu sizing lib
        registerMenu(this.mainMenu.nativeElement, {
            // map config properties to css vars
            minItemSize: '@item-size',
            itemPadding: '@item-padding',
            fontSize: '@item-font-size',
            reservedWidth: '@menu-reserved-width',
            onCollapse: function () {
                _this.collapsed = true;
            },
            onExpand: function () {
                _this.collapsed = false;
            }
        }).check();
    };
    /**
     * Close Menu
     */
    AlphaGlobalHeader.prototype.close = function () {
        $htmlClasses.remove('nav-open');
        this._isOpen = false;
    };
    /**
     * Open Menu
     */
    AlphaGlobalHeader.prototype.open = function () {
        $htmlClasses.add('nav-open');
        this._isOpen = true;
    };
    /**
     * Toggle Menu
     */
    AlphaGlobalHeader.prototype.toggleMenu = function () {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Toggle Search Input
     */
    AlphaGlobalHeader.prototype.toggleSearchInput = function () {
        this.searchOpenClass = this.searchOpenClass === 'open' ? '' : 'open';
    };
    AlphaGlobalHeader.decorators = [
        { type: Component, args: [{
                    selector: 'alpha-global-header',
                    template: "\n\t<a *ngIf=\"home\" class=\"question-mark icon-logo\" id=\"mobileLogo\" [routerLink]=\"home\"></a>\n\t<div class=\"menu-wrapper\">\n\t\t<div class=\"menu-container\">\n\n\t\t\t<span id=\"closeButton\" class=\"icon-close-thin\" (click)=\"close()\"></span>\n\n\n\t\t\t<div *ngIf=\"home\" class=\"before-menu\">\n\t\t\t\t<a class=\"question-mark icon-logo\" [routerLink]=\"home\"></a>\n\t\t\t</div>\n\n\t\t\t<ul #mainMenu class=\"main-menu collapsible\">\n\n\t\t\t\t<ng-content></ng-content>\n\n\t\t\t\t<ng-container *ngIf=\"languages\">\n\t\t\t\t\t<li class=\"language-menu bg-darker menu-item menu-item-has-children\">\n\t\t\t\t\t\t<a class=\"icon-globe\"></a>\n\t\t\t\t\t\t<a class=\"language-menu-link\" href=\"#\">Languages</a>\n\t\t\t\t\t\t<span class=\"sub-menu-toggle\"></span>\n\t\t\t\t\t\t<ul class=\"sub-menu\">\n\t\t\t\t\t\t\t<li *ngFor=\"let language of languages\" class=\"menu-item \"><a [href]=\"language.href\">{{ language.label }}</a></li>\n\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t</ng-container>\n\n\t\t\t\t<ng-container *ngIf=\"search\">\n\t\t\t\t\t<li class=\"menu-item search-element search-element-toggle\" (click)=\"toggleSearchInput()\">\n\t\t\t\t\t\t<a class=\"menu-search-label icon-search\"></a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<div id=\"menuSearchArea\" class=\"menu-search-area {{ searchOpenClass }}\">\n\t\t\t\t\t\t<form class=\"menu-search\" [action]=\"searchAction\">\n\t\t\t\t\t\t\t<div class=\"menu-search-input-wrapper\">\n\t\t\t\t\t\t\t\t<input class=\"menu-search-input\" type=\"text\" name=\"s\" value=\"\" placeholder=\"Search\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"search-form-close icon-close-thin\" (click)=\"toggleSearchInput()\"></div>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\t\t\t\t</ng-container>\n\n\t\t\t</ul>\n\n\t\t</div>\n\t</div>\n\n\t<div class=\"menu-toggle\" (click)=\"toggleMenu()\"><i></i></div>\n  \t",
                    styleUrls: ['../../../assets/less/styles/header.less'],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AlphaGlobalHeader.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AlphaGlobalHeader.propDecorators = {
        'menuItems': [{ type: ContentChildren, args: [MenuItem, { descendants: false, read: ElementRef },] },],
        'subMenus': [{ type: ContentChildren, args: [SubMenu, { descendants: true, read: ElementRef },] },],
        'mainMenu': [{ type: ViewChild, args: ['mainMenu',] },],
        'home': [{ type: Input, args: ['home',] },],
        'search': [{ type: Input, args: ['search',] },],
        'searchAction': [{ type: Input, args: ['searchAction',] },],
        'languages': [{ type: Input, args: ['languages',] },],
        'onMenuClick': [{ type: HostListener, args: ['click', ['$event'],] },],
        'opened': [{ type: HostBinding, args: ['class.open',] },],
    };
    return AlphaGlobalHeader;
}());
export { AlphaGlobalHeader };
//# sourceMappingURL=alpha-global-header.component.js.map
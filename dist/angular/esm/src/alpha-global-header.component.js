import { Component, Input, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AlphaHeader } from './util/menu-component';
var AlphaGlobalHeader = /** @class */ (function () {
    function AlphaGlobalHeader(elRef, router) {
        var _this = this;
        this.elRef = elRef;
        this.router = router;
        this.languages = [];
        /**
         * Listen to navigation events
         * Toolbar items that get moved around lose their ability to have their classes added / removed by angular
         */
        this.router.events.subscribe(function (event) {
            if (!_this.header) {
                return;
            }
            if (event instanceof NavigationStart) {
                // close any open nav
                _this.header.close();
            }
        });
    }
    /**
     * Close menu when clicking on self link
     *
     * @param event
     */
    AlphaGlobalHeader.prototype.onClick = function (event) {
        var targ = event.target, isRouterLink = targ.hasAttribute('href');
        if (isRouterLink) {
            // close the nav (should close by itself but when clicking on own items no navigation occurs)
            this.header.close();
        }
    };
    /**
     * After view and content has been rendered, check the menu widths
     */
    AlphaGlobalHeader.prototype.ngAfterViewInit = function () {
        // use our common menu sizing lib
        this.header = new AlphaHeader(this.elRef.nativeElement, {
            search: this.search ? { action: this.searchAction } : false,
            languages: this.languages,
            closeSubMenusOnClick: true
        });
    };
    /**
     * on click of the home link either use the router, or allow to open in new tab
     * @param event
     */
    AlphaGlobalHeader.prototype.onHomeClick = function (event) {
        if (this.home instanceof Array) {
            event.preventDefault();
            this.router.navigate(this.home);
        }
        else {
            var link = event.target;
            link.setAttribute('href', this.home);
        }
    };
    /**
     * Cleanup on destroy
     */
    AlphaGlobalHeader.prototype.ngOnDestroy = function () {
        this.header.destroy();
    };
    AlphaGlobalHeader.decorators = [
        { type: Component, args: [{
                    selector: 'alpha-global-header',
                    template: "\n\t<a *ngIf=\"home\" class=\"question-mark agh-icon-logo\" id=\"mobileLogo\" (click)=\"onHomeClick($event)\" target=\"_blank\"></a>\n\n\t<div class=\"menu-container\">\n\n\t\t<div *ngIf=\"home\" class=\"before-menu\">\n\t\t\t<a class=\"question-mark agh-icon-logo\" (click)=\"onHomeClick($event)\" target=\"_blank\"></a>\n\t\t</div>\n\n\t\t<div class=\"menu-area\">\n\n\t\t\t<ul menu-container class=\"main-menu\">\n\n\t\t\t\t<ng-content></ng-content>\n\n\t\t\t</ul>\n\n\t\t</div>\n\n\t</div>\n\n  \t",
                    styleUrls: ['../../../assets/less/styles/header.less'],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AlphaGlobalHeader.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Router, },
    ]; };
    AlphaGlobalHeader.propDecorators = {
        'home': [{ type: Input, args: ['home',] },],
        'search': [{ type: Input, args: ['search',] },],
        'searchAction': [{ type: Input, args: ['search-action',] },],
        'languages': [{ type: Input, args: ['languages',] },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return AlphaGlobalHeader;
}());
export { AlphaGlobalHeader };
//# sourceMappingURL=alpha-global-header.component.js.map
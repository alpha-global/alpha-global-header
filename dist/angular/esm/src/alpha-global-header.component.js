import { Component, Input, ViewEncapsulation, ElementRef, } from '@angular/core';
import { AlphaHeader } from './util/menu-component';
var AlphaGlobalHeader = /** @class */ (function () {
    function AlphaGlobalHeader(elRef) {
        this.elRef = elRef;
    }
    /**
     * After view and content has been rendered, check the menu widths
     */
    AlphaGlobalHeader.prototype.ngAfterViewInit = function () {
        // use our common menu sizing lib
        var header = new AlphaHeader(this.elRef.nativeElement, {
            // map config properties to css vars
            minItemSize: '@item-size',
            itemPadding: '@item-padding',
            fontSize: '@item-font-size',
            reservedWidth: '@menu-reserved-width',
            search: this.search ? { action: this.searchAction } : false,
            languages: this.languages
        });
        header.check();
    };
    AlphaGlobalHeader.decorators = [
        { type: Component, args: [{
                    selector: 'alpha-global-header',
                    template: "\n\t<a *ngIf=\"home\" class=\"question-mark agh-icon-logo\" id=\"mobileLogo\" [routerLink]=\"home\"></a>\n\n\t<div class=\"menu-container\">\n\n\t\t<div *ngIf=\"home\" class=\"before-menu\">\n\t\t\t<a class=\"question-mark agh-icon-logo\" [routerLink]=\"home\"></a>\n\t\t</div>\n\n\t\t<div class=\"menu-area\">\n\n\t\t\t<ul menu-container class=\"main-menu\">\n\n\t\t\t\t<ng-content></ng-content>\n\n\t\t\t</ul>\n\n\t\t</div>\n\n\t</div>\n\n  \t",
                    styleUrls: ['../../../assets/less/styles/header.less'],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AlphaGlobalHeader.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AlphaGlobalHeader.propDecorators = {
        'home': [{ type: Input, args: ['home',] },],
        'search': [{ type: Input, args: ['search',] },],
        'searchAction': [{ type: Input, args: ['search-action',] },],
        'languages': [{ type: Input, args: ['languages',] },],
    };
    return AlphaGlobalHeader;
}());
export { AlphaGlobalHeader };
//# sourceMappingURL=alpha-global-header.component.js.map
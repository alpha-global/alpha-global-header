import { Component, Input, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AlphaHeader } from './util/menu-component';
var AlphaGlobalHeader = /** @class */ (function () {
    function AlphaGlobalHeader(elRef, router) {
        var _this = this;
        this.elRef = elRef;
        this.router = router;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                var selectedElements = _this.elRef.nativeElement.querySelectorAll('.current-menu-item');
                var i = 0, len = selectedElements.length;
                for (i; i < len; i++) {
                    var el = selectedElements[i];
                    el.classList.remove('current-menu-item');
                }
                // close any open nav
                _this.header.close();
            }
        });
    }
    /**
     * Since toolbar items (the profile icon) are moved around the dom, the router link breaks
     * Let's listen for those router link requests and make them work
     * @param event
     */
    AlphaGlobalHeader.prototype.onClick = function (event) {
        var targ = event.target;
        if (targ.hasAttribute('ng-reflect-router-link') && targ.hasAttribute('toolbar-item')) {
            // router link value
            var link = targ.getAttribute('ng-reflect-router-link');
            // convert link to router instruction
            var parts = link.split(','); //.map(path => '"'+path+'"');
            // navigate
            this.router.navigate(parts);
            // selected class link value
            targ.classList.add(targ.getAttribute('ng-reflect-router-link-active'));
        }
    };
    /**
     * After view and content has been rendered, check the menu widths
     */
    AlphaGlobalHeader.prototype.ngAfterViewInit = function () {
        // use our common menu sizing lib
        this.header = new AlphaHeader(this.elRef.nativeElement, {
            search: this.search ? { action: this.searchAction } : false,
            languages: this.languages
        });
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
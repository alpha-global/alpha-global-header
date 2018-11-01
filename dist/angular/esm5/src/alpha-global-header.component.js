/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AlphaHeader } from './util/menu-component';
var AlphaGlobalHeader = /** @class */ (function () {
    function AlphaGlobalHeader(elRef, router) {
        var _this = this;
        this.elRef = elRef;
        this.router = router;
        this.homeTarget = '_self';
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
    /**
     * Close menu when clicking on self link
     *
     * @param {?} event
     * @return {?}
     */
    AlphaGlobalHeader.prototype.onClick = /**
     * Close menu when clicking on self link
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var targ = event.target;
        /** @type {?} */
        var isRouterLink = targ.hasAttribute('href');
        if (isRouterLink) {
            // close the nav (should close by itself but when clicking on own items no navigation occurs)
            this.header.close();
        }
    };
    /**
     * After view and content has been rendered, check the menu widths
     */
    /**
     * After view and content has been rendered, check the menu widths
     * @return {?}
     */
    AlphaGlobalHeader.prototype.ngAfterViewInit = /**
     * After view and content has been rendered, check the menu widths
     * @return {?}
     */
    function () {
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
    /**
     * on click of the home link either use the router, or allow to open in new tab
     * @param {?} event
     * @return {?}
     */
    AlphaGlobalHeader.prototype.onHomeClick = /**
     * on click of the home link either use the router, or allow to open in new tab
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.home instanceof Array) {
            event.preventDefault();
            this.router.navigate(this.home);
        }
        else {
            /** @type {?} */
            var link = (/** @type {?} */ (event.target));
            link.setAttribute('href', this.home);
        }
    };
    /**
     * Cleanup on destroy
     */
    /**
     * Cleanup on destroy
     * @return {?}
     */
    AlphaGlobalHeader.prototype.ngOnDestroy = /**
     * Cleanup on destroy
     * @return {?}
     */
    function () {
        this.header.destroy();
    };
    AlphaGlobalHeader.decorators = [
        { type: Component, args: [{
                    selector: 'alpha-global-header',
                    template: "\n\t<a *ngIf=\"home\" class=\"question-mark agh-icon-logo\" id=\"mobileLogo\" (click)=\"onHomeClick($event)\" [target]=\"homeTarget\"></a>\n\n\t<div class=\"menu-container\">\n\n\t\t<div *ngIf=\"home\" class=\"before-menu\">\n\t\t\t<a class=\"question-mark agh-icon-logo\" (click)=\"onHomeClick($event)\" [target]=\"homeTarget\"></a>\n\t\t</div>\n\n\t\t<div class=\"menu-area\">\n\n\t\t\t<ul menu-container class=\"main-menu\">\n\n\t\t\t\t<ng-content></ng-content>\n\n\t\t\t</ul>\n\n\t\t</div>\n\n\t</div>\n\n  \t",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["@font-face{font-family:AlphaIcons;font-weight:400;font-style:normal;src:url(data:application/font-woff;charset=utf-8;base64,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)}[class*=\" agh-icon-\"]::before,[class^=agh-icon-]::before,[data-agh-icon]::before{font-family:AlphaIcons!important;display:inline-block;font-style:normal;font-weight:400;font-variant:normal;text-transform:none!important;speak:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}[data-agh-icon]::before{content:attr(data-agh-icon)}.agh-icon-logo::before{content:\"\\64\"}.agh-icon-menu-toggle::before{content:\"\\65\"}.agh-icon-search::before{content:\"\\67\"}.agh-icon-check::before{content:\"\\76\"}.agh-icon-globe::before{content:\"\\77\"}.agh-icon-profile::before{content:\"\\78\"}.agh-icon-close-thin::before{content:\"\\79\"}html.nav-open{overflow:hidden}html.nav-open .menu-toolbar{display:none!important}html.nav-collapsed body{padding-top:84px}html.nav-collapsed alpha-global-header{box-sizing:initial;height:84px}html.nav-collapsed alpha-global-header .question-mark{width:84px;height:84px;max-width:84px;min-width:84px}html.nav-collapsed alpha-global-header [menu-icon]{max-width:84px}html.nav-collapsed alpha-global-header .menu-search-area,html.nav-collapsed alpha-global-header .menu-search-input{height:84px}html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children:hover>.sub-menu{top:85px}html.nav-collapsed alpha-global-header .menu-toolbar>.menu-item-has-children.open>.sub-menu{top:84px}html.nav-collapsed alpha-global-header .menu-toolbar>::after,html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>::after{height:84px}html.nav-collapsed alpha-global-header .menu-toolbar>.menu-icon-width,html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>.menu-icon-width{max-width:84px}html.nav-collapsed alpha-global-header .menu-search-area form .search-form-close{flex-basis:84px}html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>:not(template){min-width:84px}html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>:not(template)>a{height:84px}html:not([dir=rtl]) html.nav-collapsed alpha-global-header:not(.collapsed) .main-menu>:not(template):last-child .sub-menu{right:-1px;left:unset}html.nav-collapsed alpha-global-header.collapsed .menu-toolbar>:not(template){min-width:84px;height:84px}html.nav-minified body{padding-top:58px}html.nav-minified alpha-global-header{box-sizing:initial;height:58px}html.nav-minified alpha-global-header .question-mark{width:58px;height:58px;max-width:58px;min-width:58px}html.nav-minified alpha-global-header [menu-icon]{max-width:58px}html.nav-minified alpha-global-header .menu-search-area,html.nav-minified alpha-global-header .menu-search-input{height:58px}html.nav-minified alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children:hover>.sub-menu{top:59px}html.nav-minified alpha-global-header .menu-toolbar>.menu-item-has-children.open>.sub-menu{top:58px}html.nav-minified alpha-global-header .menu-toolbar>::after,html.nav-minified alpha-global-header:not(.collapsed) .main-menu>::after{height:58px}html.nav-minified alpha-global-header .menu-toolbar>.menu-icon-width,html.nav-minified alpha-global-header:not(.collapsed) .main-menu>.menu-icon-width{max-width:58px}html.nav-minified alpha-global-header .menu-search-area form .search-form-close{flex-basis:58px}html.nav-minified alpha-global-header:not(.collapsed) .main-menu>:not(template){min-width:58px}html.nav-minified alpha-global-header:not(.collapsed) .main-menu>:not(template)>a{height:58px}html:not([dir=rtl]) html.nav-minified alpha-global-header:not(.collapsed) .main-menu>:not(template):last-child .sub-menu{right:-1px;left:unset}html.nav-minified alpha-global-header.collapsed .menu-toolbar>:not(template){min-width:58px;height:58px}body{padding-top:84px}alpha-global-header{box-sizing:initial;height:84px;display:block;position:fixed;z-index:250000;top:0;left:0;width:100%;line-height:1;font-family:\"Avante Garde\",\"Century Gothic\",sans-serif;color:#000}alpha-global-header .menu-search-area,alpha-global-header .menu-search-input{height:84px}alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children:hover>.sub-menu{top:85px}alpha-global-header .menu-toolbar>.menu-item-has-children.open>.sub-menu{top:84px}alpha-global-header .menu-toolbar>.menu-icon-width,alpha-global-header:not(.collapsed) .main-menu>.menu-icon-width{max-width:84px}alpha-global-header .menu-search-area form .search-form-close{flex-basis:84px}html:not([dir=rtl]) alpha-global-header:not(.collapsed) .main-menu>:not(template):last-child .sub-menu{right:-1px;left:unset}alpha-global-header a{text-decoration:none;display:block;color:inherit;cursor:pointer}alpha-global-header li,alpha-global-header ul{padding:0;margin:0;list-style:none;position:relative}alpha-global-header #closeButton{display:none}alpha-global-header .question-mark{width:84px;height:84px;max-width:84px;min-width:84px;cursor:pointer;color:#e42312;font-size:45px;display:flex;align-items:center;justify-content:center;box-sizing:border-box}alpha-global-header li a{color:#000;transition:color .3s ease-out,background-color .3s ease-out}alpha-global-header [menu-icon]{max-width:84px;cursor:pointer;font-size:22px;transition:color .2s ease-out}alpha-global-header [menu-icon]:hover::before{color:#e42312}alpha-global-header [menu-icon]::before{font-family:AlphaIcons;content:attr(menu-icon);font-weight:400;position:relative;z-index:50;transition:color .2s ease-out}alpha-global-header .no-cursor{cursor:default}alpha-global-header .search-icon{font-size:26px}alpha-global-header .menu-toolbar .menu-item-has-children.open:not(.current-menu-item),alpha-global-header:not(.collapsed) .main-menu .menu-item-has-children:hover:not(.current-menu-item){border-bottom:1px solid #fff}alpha-global-header .menu-toolbar .menu-item-has-children.open>.sub-menu,alpha-global-header:not(.collapsed) .main-menu .menu-item-has-children:hover>.sub-menu{-webkit-transform:translateY(0);transform:translateY(0);height:auto;border:1px solid #dfdfdf;border-top:none}alpha-global-header .menu-toolbar>::before,alpha-global-header:not(.collapsed) .main-menu>::before{position:relative;z-index:50}alpha-global-header .menu-toolbar>::after,alpha-global-header:not(.collapsed) .main-menu>::after{height:84px;content:\"\";background:#fff;position:absolute;top:0;left:0;z-index:32;display:block;width:100%;border-left:1px solid #dfdfdf;border-right:1px solid #dfdfdf}alpha-global-header .menu-toolbar>* .sub-menu li:hover>a,alpha-global-header .menu-toolbar>:not(.menu-btn):hover>a,alpha-global-header:not(.collapsed) .main-menu>* .sub-menu li:hover>a,alpha-global-header:not(.collapsed) .main-menu>:not(.menu-btn):hover>a{color:#e42312}alpha-global-header .menu-toolbar>.current-menu-ancestor::after,alpha-global-header .menu-toolbar>.current-menu-item::after,alpha-global-header:not(.collapsed) .main-menu>.current-menu-ancestor::after,alpha-global-header:not(.collapsed) .main-menu>.current-menu-item::after{border-bottom:2px solid #e42312;top:-2px}alpha-global-header .menu-toolbar>.current-menu-ancestor .current-menu-item a,alpha-global-header .menu-toolbar>.current-menu-item .current-menu-item a,alpha-global-header:not(.collapsed) .main-menu>.current-menu-ancestor .current-menu-item a,alpha-global-header:not(.collapsed) .main-menu>.current-menu-item .current-menu-item a{color:#e42312}alpha-global-header .menu-toolbar>.menu-item-has-children .sub-menu,alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children .sub-menu{overflow:hidden;position:absolute;z-index:30;left:0;min-width:-webkit-max-content;min-width:-moz-max-content;min-width:max-content;width:100%;height:0;padding:0;background:#fff;-webkit-transform:translateY(-100%);transform:translateY(-100%);transition:transform .2s ease-out;transition:transform .2s ease-out,-webkit-transform .2s ease-out}alpha-global-header .menu-toolbar>.menu-item-has-children .sub-menu a,alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children .sub-menu a{padding:18px 50px 16px;letter-spacing:0}alpha-global-header .menu-toolbar>.menu-item-has-children .sub-menu a:hover,alpha-global-header:not(.collapsed) .main-menu>.menu-item-has-children .sub-menu a:hover{background:#f9f9f9}alpha-global-header .main-menu{display:flex;flex-flow:row nowrap;margin:0;font-size:18px}alpha-global-header .main-menu>:not(template){font-weight:600;letter-spacing:.36px;position:relative}alpha-global-header .main-menu>:not(template)>a{position:relative;z-index:35;box-sizing:border-box;display:flex;align-items:center;flex-flow:row wrap}alpha-global-header .sub-menu{font-size:16px;font-weight:200}alpha-global-header .menu-toggle{background-color:#f9f9f9;border-left:1px solid #dfdfdf;z-index:50}html:not(.nav-minified) alpha-global-header .menu-toggle:hover i,html:not(.nav-minified) alpha-global-header .menu-toggle:hover::after,html:not(.nav-minified) alpha-global-header .menu-toggle:hover::before{background-color:#e42312}alpha-global-header .menu-toggle i,alpha-global-header .menu-toggle::after,alpha-global-header .menu-toggle::before{height:2px!important;margin:4px 0;display:block;background-color:#000;position:static;width:33%;transition:background-color .2s ease-out}alpha-global-header .menu-toggle::after,alpha-global-header .menu-toggle::before{content:\"\"}alpha-global-header .menu-search-area{position:absolute;z-index:300;left:100%;top:0;width:100%;background:#fff;-webkit-transform:translateX(0);transform:translateX(0);transition:transform .3s ease-out,-webkit-transform .3s ease-out}alpha-global-header .menu-search-area form{display:flex;flex-grow:1}alpha-global-header .menu-search-area.open{-webkit-transform:translateX(-100%);transform:translateX(-100%)}alpha-global-header .menu-search-area .search-form-close{cursor:pointer;background-color:#e42312;color:#fff;font-size:30px;display:flex;justify-content:center;align-items:center}alpha-global-header .menu-search-area .menu-search-input-wrapper{flex-grow:1}alpha-global-header .menu-search-area .menu-search-input{font-size:20px;color:#5d6368;border:none;border-left:1px solid #dfdfdf;background-color:#f9f9f9;width:100%;margin:0;padding:20px 50px;box-sizing:border-box}alpha-global-header .menu-search-area .menu-search-input:focus{outline:0}alpha-global-header:not(.collapsed) #mobileLogo,alpha-global-header:not(.collapsed) .menu-toolbar{display:none}alpha-global-header:not(.collapsed) .before-menu{border-bottom:1px solid #dfdfdf;flex-grow:1;min-width:84px;background:#fff}alpha-global-header:not(.collapsed) .menu-container{display:flex;justify-content:space-between}alpha-global-header:not(.collapsed) .menu-btn::after{background-color:#e42312;transition:background-color 150ms ease-in-out}alpha-global-header:not(.collapsed) .menu-btn:hover::after{background-color:#b51c0e}alpha-global-header:not(.collapsed) .menu-btn a{color:#fff;line-height:1.8}alpha-global-header:not(.collapsed) .menu-area{position:relative}alpha-global-header:not(.collapsed) .main-menu{justify-content:flex-end}alpha-global-header:not(.collapsed) .main-menu>:not(template){min-width:84px;border-bottom:1px solid #dfdfdf;display:flex;align-items:center;justify-content:center;flex:1 0 auto}alpha-global-header:not(.collapsed) .main-menu>:not(template).bg-darker::after{background-color:#f9f9f9}alpha-global-header:not(.collapsed) .main-menu>:not(template)>a{height:84px;width:100%;justify-content:center}alpha-global-header.collapsed{display:flex;justify-content:space-between;background:#fff;border-bottom:1px solid #dfdfdf}alpha-global-header.collapsed.open .main-menu{display:flex}alpha-global-header.collapsed.open #closeButton{display:block;position:absolute;right:0;z-index:100;font-size:26px;padding:15px;line-height:80%;cursor:pointer;color:#fff}alpha-global-header.collapsed .menu-toolbar{display:flex;flex-flow:row nowrap;flex-grow:1;justify-content:flex-end;position:relative}alpha-global-header.collapsed .menu-toolbar>:not(template){min-width:84px;height:84px;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;position:relative}alpha-global-header.collapsed .menu-search-area .menu-search-input{border:none}alpha-global-header.collapsed .before-menu{display:none}alpha-global-header.collapsed .main-menu .sub-menu-toggle{cursor:pointer;display:inline-flex;justify-content:center;align-items:center;margin:0 0 0 -12px;vertical-align:middle;height:auto;padding:10px}alpha-global-header.collapsed .main-menu .sub-menu-toggle::before{content:\"\";position:absolute;border-bottom:none;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #fff}alpha-global-header.collapsed li{border:none;display:block}alpha-global-header.collapsed li a{background:0 0;height:auto;color:inherit}alpha-global-header.collapsed .menu-container li a{border:none}alpha-global-header.collapsed .main-menu{position:fixed;top:0;left:0;z-index:50;width:100%;height:100%;overflow-y:auto;display:none;flex-flow:column nowrap;justify-content:center;background:#000;color:#fff;text-align:center}alpha-global-header.collapsed .main-menu a{padding-top:8px;padding-bottom:8px;color:inherit}alpha-global-header.collapsed .main-menu [menu-icon]{max-width:none}alpha-global-header.collapsed .main-menu [menu-icon]:hover::before{color:inherit}alpha-global-header.collapsed .main-menu [menu-icon]::before{font-family:inherit;font-weight:inherit;content:attr(menu-title);display:inline-block}alpha-global-header.collapsed .main-menu [menu-icon]:not(a)::before{padding:8px 15px}alpha-global-header.collapsed .main-menu [menu-icon] .sub-menu-toggle{margin-left:-8px}alpha-global-header.collapsed .main-menu>:not(template){margin-bottom:10px;width:100%;flex:initial;font-size:24px}alpha-global-header.collapsed .main-menu>:not(template)>a{display:inline-block;font-size:inherit;flex-grow:0;height:auto}alpha-global-header.collapsed .main-menu>:not(template).open>.sub-menu{display:block}alpha-global-header.collapsed .main-menu>:not(template).open .sub-menu-toggle::before{border-top:none;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #fff}alpha-global-header.collapsed .main-menu .sub-menu{margin:20px 0;position:static;visibility:visible;display:none;background:0 0;border:none;width:100%;-webkit-transform:none;transform:none;font-size:18px}alpha-global-header.minified{border:none}alpha-global-header.minified .menu-toggle{background:0 0;border:none!important}alpha-global-header.minified .menu-toggle::after,alpha-global-header.minified .menu-toggle::before,alpha-global-header.minified .menu-toggle>i{margin:2px 0}alpha-global-header.minified .question-mark{font-size:30px}alpha-global-header.minified .menu-toolbar>:not(.menu-toggle){display:none}"]
                }] }
    ];
    /** @nocollapse */
    AlphaGlobalHeader.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Router }
    ]; };
    AlphaGlobalHeader.propDecorators = {
        home: [{ type: Input, args: ['home',] }],
        homeTarget: [{ type: Input, args: ['homeTarget',] }],
        search: [{ type: Input, args: ['search',] }],
        searchAction: [{ type: Input, args: ['search-action',] }],
        languages: [{ type: Input, args: ['languages',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return AlphaGlobalHeader;
}());
export { AlphaGlobalHeader };
if (false) {
    /** @type {?} */
    AlphaGlobalHeader.prototype.header;
    /** @type {?} */
    AlphaGlobalHeader.prototype.home;
    /** @type {?} */
    AlphaGlobalHeader.prototype.homeTarget;
    /** @type {?} */
    AlphaGlobalHeader.prototype.search;
    /** @type {?} */
    AlphaGlobalHeader.prototype.searchAction;
    /** @type {?} */
    AlphaGlobalHeader.prototype.languages;
    /** @type {?} */
    AlphaGlobalHeader.prototype.elRef;
    /** @type {?} */
    AlphaGlobalHeader.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxwaGEtZ2xvYmFsLWhlYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbHBoYS1nbG9iYWwtaGVhZGVyLyIsInNvdXJjZXMiOlsic3JjL2FscGhhLWdsb2JhbC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ04sU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsRUFHakIsVUFBVSxFQUNWLFlBQVksRUFFWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ04sTUFBTSxFQUNOLGVBQWUsRUFDZixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUdwRDtJQXNEQywyQkFDUyxLQUFpQixFQUNqQixNQUFjO1FBRnZCLGlCQXVCQztRQXRCUSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVE7UUF4QkEsZUFBVSxHQUFXLE9BQU8sQ0FBQztRQUc5QixjQUFTLEdBQWUsRUFBRSxDQUFDO1FBd0JoRDs7O1dBR0c7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUUsVUFBQSxLQUFLO1lBRWxDLElBQUssQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFHO2dCQUNuQixPQUFPO2FBQ1A7WUFFRCxJQUFLLEtBQUssWUFBWSxlQUFlLEVBQUc7Z0JBRXZDLHFCQUFxQjtnQkFDckIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUVwQjtRQUVGLENBQUMsQ0FBRSxDQUFBO0lBQ0osQ0FBQztJQXhDRDs7OztPQUlHOzs7Ozs7O0lBQ29DLG1DQUFPOzs7Ozs7SUFBOUMsVUFBZ0QsS0FBSzs7WUFFOUMsSUFBSSxHQUFnQixLQUFLLENBQUMsTUFBTTs7WUFDckMsWUFBWSxHQUFZLElBQUksQ0FBQyxZQUFZLENBQUUsTUFBTSxDQUFFO1FBRXBELElBQUssWUFBWSxFQUFHO1lBQ25CLDZGQUE2RjtZQUM3RixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3BCO0lBRUYsQ0FBQztJQTRCRDs7T0FFRzs7Ozs7SUFDSSwyQ0FBZTs7OztJQUF0QjtRQUVDLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO1lBRXhELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDM0QsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLG9CQUFvQixFQUFFLElBQUk7U0FFMUIsQ0FBRSxDQUFDO0lBRUwsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0ksdUNBQVc7Ozs7O0lBQWxCLFVBQW9CLEtBQWlCO1FBRXBDLElBQUssSUFBSSxDQUFDLElBQUksWUFBWSxLQUFLLEVBQUc7WUFFakMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQztTQUVsQzthQUFNOztnQkFDQSxJQUFJLEdBQWdCLG1CQUFBLEtBQUssQ0FBQyxNQUFNLEVBQWU7WUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDO1NBQ3ZDO0lBQ0YsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLHVDQUFXOzs7O0lBQWxCO1FBRUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QixDQUFDOztnQkF4SEQsU0FBUyxTQUFFO29CQUNYLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxtZ0JBcUJQO29CQUVILGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDckM7Ozs7Z0JBdkNBLFVBQVU7Z0JBTVYsTUFBTTs7O3VCQXNDTCxLQUFLLFNBQUUsTUFBTTs2QkFDYixLQUFLLFNBQUUsWUFBWTt5QkFDbkIsS0FBSyxTQUFFLFFBQVE7K0JBQ2YsS0FBSyxTQUFFLGVBQWU7NEJBQ3RCLEtBQUssU0FBRSxXQUFXOzBCQU9sQixZQUFZLFNBQUUsT0FBTyxFQUFFLENBQUUsUUFBUSxDQUFFOztJQWdGckMsd0JBQUM7Q0FBQSxBQTFIRCxJQTBIQztTQS9GWSxpQkFBaUI7OztJQUU3QixtQ0FBMkI7O0lBRTNCLGlDQUFxQzs7SUFDckMsdUNBQW9EOztJQUNwRCxtQ0FBbUM7O0lBQ25DLHlDQUErQzs7SUFDL0Msc0NBQWlEOztJQW9CaEQsa0NBQXlCOztJQUN6QixtQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG5cdENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRWaWV3RW5jYXBzdWxhdGlvbixcclxuXHRBZnRlclZpZXdJbml0LFxyXG5cdE9uRGVzdHJveSxcclxuXHRFbGVtZW50UmVmLFxyXG5cdEhvc3RMaXN0ZW5lclxyXG5cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcblx0Um91dGVyLFxyXG5cdE5hdmlnYXRpb25TdGFydFxyXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBbHBoYUhlYWRlciB9IGZyb20gJy4vdXRpbC9tZW51LWNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCgge1xyXG5cdHNlbGVjdG9yOiAnYWxwaGEtZ2xvYmFsLWhlYWRlcicsXHJcblx0dGVtcGxhdGU6IGBcclxuXHQ8YSAqbmdJZj1cImhvbWVcIiBjbGFzcz1cInF1ZXN0aW9uLW1hcmsgYWdoLWljb24tbG9nb1wiIGlkPVwibW9iaWxlTG9nb1wiIChjbGljayk9XCJvbkhvbWVDbGljaygkZXZlbnQpXCIgW3RhcmdldF09XCJob21lVGFyZ2V0XCI+PC9hPlxyXG5cclxuXHQ8ZGl2IGNsYXNzPVwibWVudS1jb250YWluZXJcIj5cclxuXHJcblx0XHQ8ZGl2ICpuZ0lmPVwiaG9tZVwiIGNsYXNzPVwiYmVmb3JlLW1lbnVcIj5cclxuXHRcdFx0PGEgY2xhc3M9XCJxdWVzdGlvbi1tYXJrIGFnaC1pY29uLWxvZ29cIiAoY2xpY2spPVwib25Ib21lQ2xpY2soJGV2ZW50KVwiIFt0YXJnZXRdPVwiaG9tZVRhcmdldFwiPjwvYT5cclxuXHRcdDwvZGl2PlxyXG5cclxuXHRcdDxkaXYgY2xhc3M9XCJtZW51LWFyZWFcIj5cclxuXHJcblx0XHRcdDx1bCBtZW51LWNvbnRhaW5lciBjbGFzcz1cIm1haW4tbWVudVwiPlxyXG5cclxuXHRcdFx0XHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcblxyXG5cdFx0XHQ8L3VsPlxyXG5cclxuXHRcdDwvZGl2PlxyXG5cclxuXHQ8L2Rpdj5cclxuXHJcbiAgXHRgLFxyXG5cdHN0eWxlVXJsczogWyAnLi4vLi4vLi4vYXNzZXRzL2xlc3Mvc3R5bGVzL2hlYWRlci5sZXNzJyBdLFxyXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSApXHJcbmV4cG9ydCBjbGFzcyBBbHBoYUdsb2JhbEhlYWRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG5cdHB1YmxpYyBoZWFkZXI6IEFscGhhSGVhZGVyO1xyXG5cclxuXHRASW5wdXQoICdob21lJyApIGhvbWU6IEFycmF5PHN0cmluZz47XHJcblx0QElucHV0KCAnaG9tZVRhcmdldCcgKSBob21lVGFyZ2V0OiBzdHJpbmcgPSAnX3NlbGYnO1xyXG5cdEBJbnB1dCggJ3NlYXJjaCcgKSBzZWFyY2g6IGJvb2xlYW47XHJcblx0QElucHV0KCAnc2VhcmNoLWFjdGlvbicgKSBzZWFyY2hBY3Rpb246IHN0cmluZztcclxuXHRASW5wdXQoICdsYW5ndWFnZXMnICkgbGFuZ3VhZ2VzOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsb3NlIG1lbnUgd2hlbiBjbGlja2luZyBvbiBzZWxmIGxpbmtcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBldmVudFxyXG5cdCAqL1xyXG5cdEBIb3N0TGlzdGVuZXIoICdjbGljaycsIFsgJyRldmVudCcgXSApIG9uQ2xpY2soIGV2ZW50ICkge1xyXG5cclxuXHRcdGNvbnN0IHRhcmc6IEhUTUxFbGVtZW50ID0gZXZlbnQudGFyZ2V0LFxyXG5cdFx0XHRpc1JvdXRlckxpbms6IGJvb2xlYW4gPSB0YXJnLmhhc0F0dHJpYnV0ZSggJ2hyZWYnICk7XHJcblxyXG5cdFx0aWYgKCBpc1JvdXRlckxpbmsgKSB7XHJcblx0XHRcdC8vIGNsb3NlIHRoZSBuYXYgKHNob3VsZCBjbG9zZSBieSBpdHNlbGYgYnV0IHdoZW4gY2xpY2tpbmcgb24gb3duIGl0ZW1zIG5vIG5hdmlnYXRpb24gb2NjdXJzKVxyXG5cdFx0XHR0aGlzLmhlYWRlci5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcblx0KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBMaXN0ZW4gdG8gbmF2aWdhdGlvbiBldmVudHNcclxuXHRcdCAqIFRvb2xiYXIgaXRlbXMgdGhhdCBnZXQgbW92ZWQgYXJvdW5kIGxvc2UgdGhlaXIgYWJpbGl0eSB0byBoYXZlIHRoZWlyIGNsYXNzZXMgYWRkZWQgLyByZW1vdmVkIGJ5IGFuZ3VsYXJcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCAhdGhpcy5oZWFkZXIgKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHQvLyBjbG9zZSBhbnkgb3BlbiBuYXZcclxuXHRcdFx0XHR0aGlzLmhlYWRlci5jbG9zZSgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gKVxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFmdGVyIHZpZXcgYW5kIGNvbnRlbnQgaGFzIGJlZW4gcmVuZGVyZWQsIGNoZWNrIHRoZSBtZW51IHdpZHRoc1xyXG5cdCAqL1xyXG5cdHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcblxyXG5cdFx0Ly8gdXNlIG91ciBjb21tb24gbWVudSBzaXppbmcgbGliXHJcblx0XHR0aGlzLmhlYWRlciA9IG5ldyBBbHBoYUhlYWRlciggdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB7XHJcblxyXG5cdFx0XHRzZWFyY2g6IHRoaXMuc2VhcmNoID8geyBhY3Rpb246IHRoaXMuc2VhcmNoQWN0aW9uIH0gOiBmYWxzZSxcclxuXHRcdFx0bGFuZ3VhZ2VzOiB0aGlzLmxhbmd1YWdlcyxcclxuXHRcdFx0Y2xvc2VTdWJNZW51c09uQ2xpY2s6IHRydWVcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogb24gY2xpY2sgb2YgdGhlIGhvbWUgbGluayBlaXRoZXIgdXNlIHRoZSByb3V0ZXIsIG9yIGFsbG93IHRvIG9wZW4gaW4gbmV3IHRhYlxyXG5cdCAqIEBwYXJhbSBldmVudFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBvbkhvbWVDbGljayggZXZlbnQ6IE1vdXNlRXZlbnQgKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmhvbWUgaW5zdGFuY2VvZiBBcnJheSApIHtcclxuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHR0aGlzLnJvdXRlci5uYXZpZ2F0ZSggdGhpcy5ob21lICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgbGluazogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGxpbmsuc2V0QXR0cmlidXRlKCAnaHJlZicsIHRoaXMuaG9tZSApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYW51cCBvbiBkZXN0cm95XHJcblx0ICovXHJcblx0cHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cclxuXHRcdHRoaXMuaGVhZGVyLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG59XHJcbiJdfQ==
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlphaGlobalHeader, MenuItem, SubMenu } from './alpha-global-header.component';
var AlphaGlobalHeaderModule = /** @class */ (function () {
    function AlphaGlobalHeaderModule() {
    }
    AlphaGlobalHeaderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AlphaGlobalHeader,
                        MenuItem,
                        SubMenu
                    ],
                    exports: [
                        AlphaGlobalHeader,
                        MenuItem,
                        SubMenu,
                        RouterModule
                    ],
                    imports: [
                        CommonModule,
                        RouterModule
                    ]
                },] },
    ];
    /** @nocollapse */
    AlphaGlobalHeaderModule.ctorParameters = function () { return []; };
    return AlphaGlobalHeaderModule;
}());
export { AlphaGlobalHeaderModule };
//# sourceMappingURL=module.js.map
import { Component } from '@angular/core';

@Component({
  selector: 'demo-page',
  template : `
  <alpha-global-header
      id="headerMenu"
      home="https://www.alphacanada.org/run"
      [languages]='[]'
      [search]="true"
      search-action="https://www.alphacanada.org"
  >
            <li  class="menu-item menu-item-has-children current-menu-item">
                <a i18n="common.resources|Preview Resources Label@@previewResourcesLabel">Dashboard</a>

                <ul class="sub-menu">
                    <li class="current-menu-item"><a>Test</a></li>
                    <li><a>Test 2</a></li>

                </ul>
            </li>
            <li  class="menu-item">
                <a i18n="common.resources|Preview Resources Label@@previewResourcesLabel">Preview Resources</a>
            </li>
            <li class="menu-item">
                <a  i18n="training.headers|Training Center Title@@trainingCenterTitle">Training Centre</a>
            </li>
            <li class="menu-item">
                <a target="_blank" i18n="common.labels|Header Support Label@@commonLabelsSupport">Support</a>
            </li>
            <li class="menu-btn menu-item tablet">
                <a  i18n="common.buttons|Create an Alpha@@buttonCreateAlpha">Create an Alpha</a>
            </li>
            <div [routerLink]="['page1/foo', 'someother']" class="bg-darker" menu-icon="x" menu-title="My Profile" toolbar-item></div>

  </alpha-global-header>
  `
})
export class AppComponent { }

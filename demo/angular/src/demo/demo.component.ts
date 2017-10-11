import { Component } from '@angular/core';

@Component({
  selector: 'demo-page',
  template : `
  <alpha-global-header
      id="headerMenu"
      home="https://www.alphacanada.org/run"
      [languages]='[{"label":"English", "href":"#english"}, {"label":"Francais", "href":"#francais"}]'
      [search]="true"
      search-action="https://www.alphacanada.org"
  >

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

  </alpha-global-header>
  `
})
export class AppComponent { }

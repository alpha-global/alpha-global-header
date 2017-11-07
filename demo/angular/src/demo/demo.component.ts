import { Component } from '@angular/core';

@Component( {
    selector: 'demo-page',
    template: `
  <alpha-global-header *ngIf="!state || state === 'loggedIn'"
      id="headerMenu"
      home="https://www.alphacanada.org/run"
      [languages]='[{label:"English", href:"#foo"}]'
      search-action="https://www.alphacanada.org"
      search="true"
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
            <li class="menu-item-has-children no-cursor menu-icon-width current-menu-item" >
                <a  [routerLink]="['/alphas/my-alphas']" i18n-menu-title="common.words|My Profile@@commonWordsMyProfile"
                    menu-icon="x" menu-title="My Profile"></a>

                <ul class="sub-menu">
                    <li routerLinkActive="current-menu-item" [routerLink]="['/alphas/my-alphas']">
                        <a i18n="alpha.mine|My Alphas@@alphaMyAlphas">My Alphas</a>
                    </li>
                    <li class="current-menu-item" [routerLink]="['/user/profile']">
                        <a i18n="common.buttons|Button Edit Profile@@buttonEditProfile">Edit Profile</a>
                    </li>
                    <li>
                        <a logout-link="/user/login" i18n="common.labels|Logout@@commonLabelsLogout">Logout</a>
                    </li>
                </ul>
            </li>

            <li class="menu-item-has-children sub-menu-toggle current-menu-item" toolbar-item menu-icon="x" menu-title="My Profile">
                <ul class="sub-menu">
                    <li routerLinkActive="current-menu-item" >
                        <a [routerLink]="['/alphas/my-alphas']" i18n="alpha.mine|My Alphas@@alphaMyAlphas">My Alphas</a>
                    </li>
                    <li routerLinkActive="current-menu-item" [routerLink]="['/user/profile']" class="current-menu-item">
                        <a i18n="common.buttons|Button Edit Profile@@buttonEditProfile">Edit Profile</a>
                    </li>
                    <li>
                        <a logout-link="/user/login" i18n="common.labels|Logout@@commonLabelsLogout">Logout</a>
                    </li>
                </ul>
            </li>


  </alpha-global-header>

  <alpha-global-header *ngIf="state === 'loggedOut'"
      id="headerMenu"
      home="https://www.alphacanada.org/run"
      [languages]='[]'

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
                <a  i18n="common.buttons|Create an Alpha@@buttonCreateAlpha">Signup</a>
            </li>

  </alpha-global-header>

    <br/><br/>
    <button (click)="state = 'loggedIn'">Show Logged In State</button>
    <button (click)="state = 'loggedOut'">Show Logged Out State</button>

  `
} )
export class AppComponent { }

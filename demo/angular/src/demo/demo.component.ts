import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template : `
  <alpha-global-header
      id="headerMenu"
      home="https://www.alphacanada.org/run"
      [languages]='[{"label":"English", "href":"#english"}, {"label":"Francais", "href":"#francais"}]'
      [search]="true"
      search-action="https://www.alphacanada.org"
  >

    <li class="menu-item menu-item-has-children"><a href="https://www.alphacanada.org/run/">Run</a>
    <ul class="sub-menu">
      <li class="menu-item"><a href="https://www.alphacanada.org/run/">What is Alpha?</a></li>
      <li class="menu-item"><a href="https://www.alphacanada.org/run/how-to-run/">How to Run Alpha</a></li>
      <li class="menu-item"><a href="https://www.alphacanada.org/run/resources/">Resources</a></li>
      <li class="menu-item"><a href="http://invitecanada.ca/">Global Alpha Campaign</a></li>
    </ul>
    </li>
    <li class="menu-item  menu-item-has-children"><a href="https://www.alphacanada.org/blog">Blog</a>
    <ul class="sub-menu">
      <li class="menu-item"><a href="https://www.alphacanada.org/category/latest-news/">News</a></li>
      <li class="menu-item"><a href="https://www.alphacanada.org/category/alpha-stories/">Stories</a></li>
    </ul>
    </li>
    <li class="menu-item menu-item-has-children"><a href="https://www.alphacanada.org/connect/">Connect</a>
    <ul class="sub-menu">
      <li class="menu-item"><a href="https://www.alphacanada.org/connect/">Contact</a></li>
      <li class="menu-item"><a href="https://donate.alphacanada.org/team">Our Team</a></li>
      <li class="menu-item"><a href="http://alpha.org/">International</a></li>
      <li class="menu-item"><a href="https://www.alphacanada.org/connect/careers/">Careers</a></li>
      <li class="menu-item"><a href="https://www.alphacanada.org/connect/media-room/">Media Room</a></li>
    </ul>
    </li>
    <li class="menu-item current-menu-item current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children"><a href="https://alphadonate.rtdev.net/">Give</a>
    <ul class="sub-menu">
      <li class="menu-item current-menu-item current_page_item"><a href="/">Give to Alpha</a></li>
      <li class="menu-item"><a href="/regions">Give to a Region</a></li>
      <li class="menu-item"><a href="/campaigns">Give to a Project</a></li>
    </ul>
    </li>
    <li class="menu-item"><a href="https://alphadonate.rtdev.net/wp-login.php">Login</a></li>
    <li class="menu-btn menu-item"><a href="https://run.alphacanada.org">Get Started</a></li>

  </alpha-global-header>
  `,
  styleUrls : ["../../../../assets/css/ITCAvantGardeStd.css"]
})
export class AppComponent { }

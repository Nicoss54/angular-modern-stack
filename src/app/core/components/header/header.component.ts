import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ams-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sfeir-header">
      <img class="sfeir-header__logo" height="120" width="125" src="/assets/logo-sfeir.svg" alt="sfeir-logo" />
      <ul role="menu-navigation" class="sfeir-header__menu">
        <li class="sfeir-header__menu__item" role="item" [routerLink]="['/peoples', 'random']" routerLinkActive="active">
          Random
        </li>
        <li class="sfeir-header__menu__item" role="item" [routerLink]="['/peoples', 'list']" routerLinkActive="active">List</li>
      </ul>
    </header>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
      header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: 7rem;
        background-color: #1d1d2b;
        padding: 0 1rem;
        position: relative;
      }

      ul.sfeir-header__menu {
        all: unset;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
      }

      li.sfeir-header__menu__item {
        all: unset;
        font-size: 1.3rem;
        color: white;
        margin-right: 1rem;
      }

      li.sfeir-header__menu__item:hover {
        color: #ecb7d6;
      }

      li.sfeir-header__menu__item.active {
        color: #ecb7d6;
        text-decoration: underline;
        text-underline-offset: 5px;
      }
    `,
  ],
})
export class HeaderComponent {}

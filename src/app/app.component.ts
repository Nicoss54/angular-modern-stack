import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'ams-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `<main class="sfeir-main-app">
    <ams-header></ams-header>
    <section class="sfeir-main-app__container-view">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styles: [
    `
      main.sfeir-main-app {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      }

      ams-header {
        height: 5rem;
        margin-bottom: 1rem;
      }

      section.sfeir-main-app__container-view {
        width: 100%;
        height: calc(100% - 5rem - 1rem);
      }
    `,
  ],
})
export class AppComponent {}

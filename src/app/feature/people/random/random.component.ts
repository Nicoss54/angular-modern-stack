import { PeopleService } from '@ams/core/services/people.service';
import { CardComponent } from '@ams/shared/components/card/card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedoOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, CardComponent, NzCardModule, NzButtonModule, NzIconModule],
  template: `
    <article class="sfeir-homepage">
      <ams-card
        *ngIf="people$ | async as people"
        [people]="people"
        (editPerson)="goToEditPerson($event)"
        (deletePerson)="getNewRandomPerson()"
      ></ams-card>
      <button
        type="primary"
        nz-button
        nzType="primary"
        class="random-people"
        name="new-random-people-button"
        nzShape="circle"
        nzSize="large"
        (click)="getNewRandomPerson()"
      >
        <span nz-icon nzType="redo" nzTheme="outline"></span>
      </button>
    </article>
  `,
  styles: [
    `
      article.sfeir-homepage {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
      }

      ams-card {
        width: 30%;
      }

      button[name='new-random-people-button'] {
        position: absolute;
        right: 2rem;
        bottom: 2rem;
      }
    `,
  ],
})
export class RandomComponent implements OnInit {
  readonly #peopleService = inject(PeopleService);
  readonly #nzIconService = inject(NzIconService);
  readonly #router = inject(Router);

  people$ = this.#peopleService.retrieveRandomPeople();

  ngOnInit(): void {
    this.#nzIconService.addIcon(RedoOutline);
  }

  getNewRandomPerson() {
    this.people$ = this.#peopleService.retrieveRandomPeople();
  }
  async goToEditPerson(idPerson: string) {
    await this.#router.navigate(['peoples', 'edit', idPerson]);
  }
}

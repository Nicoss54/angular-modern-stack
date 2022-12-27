import { PeopleService } from '@ams/core/services/people.service';
import { CardComponent } from '@ams/shared/components/card/card.component';
import { type People, type PersonForm } from '@ams/shared/models/people.model';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { UserAddOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, switchMap, type Observable } from 'rxjs';
import { DialogPeopleCreationComponent } from './dialog-people-creation/dialog-people-creation.component';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe, CardComponent, NzIconModule, NzButtonModule],
  template: `<ams-card *ngFor="let people of peoples$ | async" [people]="people"></ams-card>
    <button
      type="button"
      name="add new people button"
      nz-button
      nzType="primary"
      nzShape="circle"
      nzSize="large"
      (click)="openModalPeopleCreation()"
    >
      <span nz-icon nzType="user-add" nzTheme="outline"></span>
    </button> `,
  styles: [
    `
      :host {
        padding: 0 1rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        justify-content: space-around;
      }

      ams-card {
        width: 30%;
      }

      button[name='add new people button'] {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
      }
    `,
  ],
})
export class ListComponent implements OnInit {
  readonly #peopleService = inject(PeopleService);
  readonly #nzIconService = inject(NzIconService);
  readonly #nzModalService = inject(NzModalService);

  peoples$: Observable<People[]> = this.#peopleService.retrievePeoples();

  ngOnInit(): void {
    this.#nzIconService.addIcon(UserAddOutline);
  }

  async openModalPeopleCreation(): Promise<void> {
    this.#nzModalService
      .create({
        nzFooter: null,
        nzCentered: true,
        nzClosable: false,
        nzAutofocus: null,
        nzWidth: '40%',
        nzContent: DialogPeopleCreationComponent,
        nzTitle: 'Form to add a new person',
      })
      .afterClose.pipe(
        filter((person: PersonForm | undefined) => Boolean(person)),
        switchMap(person => this.#peopleService.createPerson(person as PersonForm))
      )
      .subscribe(() => (this.peoples$ = this.#peopleService.retrievePeoples()));
  }
}

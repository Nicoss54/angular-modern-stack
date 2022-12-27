import { type People } from '@ams/shared/models/people.model';
import { NaPipe } from '@ams/shared/pipes/na/na.pipe';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { DeleteOutline, EditOutline, EnvironmentOutline, PhoneOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

const iconsToDisplay = [PhoneOutline, EnvironmentOutline, UserOutline, EditOutline, DeleteOutline];

@Component({
  selector: 'ams-card',
  standalone: true,
  imports: [NaPipe, NzCardModule, NzAvatarModule, NzIconModule, NzButtonModule],
  template: `
    <nz-card nzHoverable [nzActions]="[deleteAction, editAction]">
      <nz-card-meta
        [nzAvatar]="avatar"
        [nzTitle]="people.firstname + ' ' + people.lastname"
        [nzDescription]="people.email"
      ></nz-card-meta>

      <section class="body-card">
        <div class="line-information">
          <span nz-icon nzType="phone" nzTheme="outline"></span>
          {{ people.phone }}
        </div>
        <div class="line-information">
          <span nz-icon nzType="environment" nzTheme="outline"></span>
          {{ people.address?.city | na }}
        </div>
        <div class="line-information">
          <span nz-icon nzType="user" nzTheme="outline"></span>
          {{ people.manager | na : 'Aucun Manager' }}
        </div>
      </section>

      <ng-template #avatar>
        <nz-avatar nzAlt="person photo" nzShape="circle" [nzSize]="75" [nzSrc]="people.photo"></nz-avatar>
      </ng-template>

      <ng-template #editAction>
        <a role="button" nz-button nzType="text" name="edit-button" (click)="editPerson(people.id)">
          <span nz-icon nzType="edit" nzTheme="outline"></span>
        </a>
      </ng-template>

      <ng-template #deleteAction>
        <a role="button" nz-button nzType="text" name="delete-button" (click)="deletePerson(people.id)">
          <span nz-icon nzType="delete" nzTheme="outline"></span>
        </a>
      </ng-template>
    </nz-card>
  `,
  styles: [
    `
      :host {
        min-width: 300px;
        width: 100%;
      }
      nz-card {
        height: fit-content;
        width: 100%;
      }

      nz-card section.body-card {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() people!: People;
  @Output('editPerson') editPerson$ = new EventEmitter<string>();
  @Output('deletePerson') deletePerson$ = new EventEmitter<string>();

  readonly #nzIconService = inject(NzIconService);

  ngOnInit(): void {
    iconsToDisplay.forEach(icon => this.#nzIconService.addIcon(icon));
  }

  editPerson(id: string): void {
    this.editPerson$.emit(id);
  }

  deletePerson(id: string): void {
    this.deletePerson$.emit(id);
  }
}

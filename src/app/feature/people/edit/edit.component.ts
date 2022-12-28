import { PeopleService } from '@ams/core/services/people.service';
import { FormContainerComponent } from '@ams/shared/components/form-container/form-container.component';
import { type People, type PersonForm } from '@ams/shared/models/people.model';
import { AsyncPipe, Location, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, type AfterContentInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, tap, type Observable } from 'rxjs';
import { PersonFormComponent } from '../shared/components/person-form/person-form.component';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, FormContainerComponent, PersonFormComponent, ReactiveFormsModule],
  template: `
    <article>
      <ams-form-container
        [disabled]="personForm.invalid"
        (clickOnCancel)="goToPreviousPage()"
        (clickOnSubmit)="updatePerson(personForm.value)"
      >
        <ams-person-form *ngIf="person$ | async" [formControl]="personForm"></ams-person-form>
      </ams-form-container>
    </article>
  `,
  styles: [
    `
      article {
        padding: 0 1rem;
        box-sizing: border-box;
      }
    `,
  ],
})
export class EditComponent implements AfterContentInit {
  readonly #peopleService = inject(PeopleService);
  readonly #router = inject(ActivatedRoute);
  readonly #changeDetectorRef = inject(ChangeDetectorRef);
  readonly #location = inject(Location);

  personForm = new FormControl<PersonForm | null>(null);

  ngAfterContentInit(): void {
    this.#changeDetectorRef.detectChanges();
  }

  person$: Observable<People> = this.#router.data.pipe(
    map(data => data['person']),
    tap(person => this.personForm.patchValue(person))
  );

  goToPreviousPage() {
    this.#location.back();
  }

  updatePerson(person: PersonForm | null) {
    this.#peopleService.updatePerson(person as PersonForm).subscribe(() => this.#location.back());
  }
}

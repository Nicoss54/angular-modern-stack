import { UnsubscribeDirective } from '@ams/shared/directives/unsubscribe.directive';
import { type PersonForm } from '@ams/shared/models/people.model';
import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  type ControlValueAccessor,
  type ValidationErrors,
  type Validator,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { takeUntil } from 'rxjs';
import { PeopleForm } from './person.form';

@Component({
  selector: 'ams-person-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzImageModule, NzFormModule, NzInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PersonFormComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: PersonFormComponent, multi: true },
  ],
  hostDirectives: [
    {
      directive: UnsubscribeDirective,
    },
  ],
  template: `<img nz-image [nzSrc]="personForm.controls.photo.value" width="128px" height="128px" alt="image person" />
    <form nz-form [formGroup]="personForm" class="people-form" nzLayout="vertical">
      <nz-form-item>
        <nz-form-label nzRequired>First Name</nz-form-label>
        <nz-form-control
          [nzHasFeedback]="personForm.controls.firstname.dirty || personForm.controls.firstname.touched"
          [nzValidateStatus]="
            (personForm.controls.firstname.touched || personForm.controls.firstname.dirty) && personForm.controls.firstname.errors
              ? 'error'
              : 'success'
          "
        >
          <input nz-input type="text" formControlName="firstname" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired>Last Name</nz-form-label>
        <nz-form-control
          [nzHasFeedback]="personForm.controls.lastname.dirty || personForm.controls.lastname.touched"
          [nzValidateStatus]="
            (personForm.controls.lastname.touched || personForm.controls.lastname.dirty) && personForm.controls.lastname.errors
              ? 'error'
              : 'success'
          "
        >
          <input nz-input type="text" formControlName="lastname" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired>Email</nz-form-label>
        <nz-form-control
          [nzHasFeedback]="personForm.controls.email.dirty || personForm.controls.email.touched"
          [nzValidateStatus]="
            (personForm.controls.email.touched || personForm.controls.email.dirty) && personForm.controls.email.errors
              ? 'error'
              : 'success'
          "
        >
          <input nz-input type="text" formControlName="email" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzRequired>Phone</nz-form-label>
        <nz-form-control
          [nzHasFeedback]="personForm.controls.phone.dirty || personForm.controls.phone.touched"
          [nzValidateStatus]="
            (personForm.controls.phone.touched || personForm.controls.phone.dirty) && personForm.controls.phone.errors
              ? 'error'
              : 'success'
          "
        >
          <input nz-input type="text" formControlName="phone" />
        </nz-form-control>
      </nz-form-item>
    </form>`,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
      }

      img {
        margin-right: 1rem;
        border-radius: 50%;
      }

      form.people-form {
        display: flex;
        flex: 2;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .people-form nz-form-item {
        width: 48%;
      }
    `,
  ],
})
export class PersonFormComponent implements ControlValueAccessor, Validator {
  readonly #onDestroyDirective = inject(UnsubscribeDirective);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  #onTouched: () => void = () => {};

  personForm = new PeopleForm();

  writeValue(people: PersonForm): void {
    people && this.personForm.patchValue(people);
  }

  registerOnChange(fn: (x: Partial<PersonForm>) => void): void {
    this.personForm.valueChanges.pipe(takeUntil(this.#onDestroyDirective.unsubscribe$)).subscribe(people => {
      fn(people);
      this.#onTouched();
    });
  }

  registerOnTouched(fn: () => void): void {
    this.#onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.personForm.disable() : this.personForm.enable();
  }

  validate(): ValidationErrors | null {
    return this.personForm.invalid ? { peopleFormOnError: true } : null;
  }
}

import { FormContainerComponent } from '@ams/shared/components/form-container/form-container.component';
import { type PersonForm } from '@ams/shared/models/people.model';
import { ChangeDetectorRef, Component, inject, type AfterContentInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { PersonFormComponent } from '../../shared/components/person-form/person-form.component';

@Component({
  standalone: true,
  imports: [FormContainerComponent, PersonFormComponent, ReactiveFormsModule],
  template: `<ams-form-container
    (clickOnCancel)="closeModal()"
    (clickOnSubmit)="save(personForm.value)"
    [disabled]="personForm.invalid"
  >
    <ams-person-form [formControl]="personForm"></ams-person-form>
  </ams-form-container>`,
  styles: [],
})
export class DialogPeopleCreationComponent implements AfterContentInit {
  readonly #nzModalRef = inject(NzModalRef<DialogPeopleCreationComponent>);
  readonly #changeDetectorRef = inject(ChangeDetectorRef);

  personForm = new FormControl();

  ngAfterContentInit(): void {
    this.#changeDetectorRef.detectChanges();
  }

  closeModal() {
    this.#nzModalRef.close();
  }

  save(personForm: Partial<PersonForm>) {
    this.#nzModalRef.close(personForm);
  }
}

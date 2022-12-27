import { FormContainerComponent } from '@ams/shared/components/form-container/form-container.component';
import { Component } from '@angular/core';
import { PersonFormComponent } from '../shared/components/person-form/person-form.component';

@Component({
  standalone: true,
  imports: [FormContainerComponent, PersonFormComponent],
  template: `<ams-form-container>
    <ams-person-form></ams-person-form>
  </ams-form-container>`,
  styles: [],
})
export class EditComponent {}

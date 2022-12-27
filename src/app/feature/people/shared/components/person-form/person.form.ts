import { type ControlFromInterface } from '@ams/shared/models/common.model';
import { type PersonForm } from '@ams/shared/models/people.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class PeopleForm extends FormGroup<ControlFromInterface<PersonForm>> {
  constructor() {
    super({
      id: new FormControl(null),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg', { nonNullable: true }),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}/)]),
    });
  }
}

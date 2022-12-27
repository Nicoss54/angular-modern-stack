import type { FormControl, FormGroup } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;

export type ControlFromInterface<T extends Record<SafeAny, SafeAny>> = {
  [key in keyof T]: T[key] extends Record<SafeAny, SafeAny> ? FormGroup<ControlFromInterface<T[key]>> : FormControl<T[key]>;
};

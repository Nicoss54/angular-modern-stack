import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'ams-form-container',
  standalone: true,
  imports: [NzButtonModule],

  template: `<section class="form-container">
    <ng-content></ng-content>
    <div class="form-container__buttons">
      <button type="button" nz-button nzType="default" (click)="cancel()">Cancel</button>
      <button type="button" nz-button nzType="primary" (click)="submit()" [disabled]="disabled">Submit</button>
    </div>
  </section> `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
      }

      .form-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .form-container__buttons {
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
})
export class FormContainerComponent {
  @Input() disabled = true;
  @Output('clickOnCancel') clickOnCancel$ = new EventEmitter<void>();
  @Output('clickOnSubmit') clickOnSubmit$ = new EventEmitter<void>();

  submit(): void {
    this.clickOnSubmit$.emit();
  }
  cancel(): void {
    this.clickOnCancel$.emit();
  }
}

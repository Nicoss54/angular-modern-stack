import { Directive, type OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Directive({
  selector: '[amsUnsubscribe]',
  standalone: true,
})
export class UnsubscribeDirective implements OnDestroy {
  readonly unsubscribe$ = new ReplaySubject<boolean>(1);

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}

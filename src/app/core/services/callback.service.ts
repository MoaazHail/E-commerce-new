import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CallbackService {
  private _router = inject(Router);

  navigate(navigate: string) {
    const callback = this._router.url;
    this._router.navigate([navigate], {
      queryParams: {
        callback: `/${callback}`,
      },
    });
  }
}

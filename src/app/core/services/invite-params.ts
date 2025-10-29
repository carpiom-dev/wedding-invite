import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class InviteParamsService {
  nombre = signal<string | null>(null);
  numero = signal<string | null>(null);

  constructor(route: ActivatedRoute) {
    route.queryParamMap.subscribe(q => {
      this.nombre.set(q.get('nombre'));
      this.numero.set(q.get('numero'));
    });
  }
}

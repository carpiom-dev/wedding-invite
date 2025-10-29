import { Injectable, signal } from '@angular/core';
import { interval, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountdownService {
  private target = new Date('2026-01-31T17:00:00-05:00').getTime();
  state = signal({ days:0, hours:0, minutes:0, seconds:0 });

  constructor(){
    interval(1000).pipe(
      startWith(0),
      map(() => {
        const diff = this.target - Date.now();
        const clamp = (n:number)=> Math.max(0,n);
        return {
          days: clamp(Math.floor(diff/86400000)),
          hours: clamp(Math.floor((diff%86400000)/3600000)),
          minutes: clamp(Math.floor((diff%3600000)/60000)),
          seconds: clamp(Math.floor((diff%60000)/1000)),
        };
      })
    ).subscribe(v => this.state.set(v));
  }
}

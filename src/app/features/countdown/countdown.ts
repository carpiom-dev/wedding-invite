import { isPlatformBrowser } from '@angular/common';
import { Component, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {
  private targetDate = new Date('2026-01-31T17:30:00').getTime();
  days = signal('--');
  hours = signal('--');
  minutes = signal('--');
  seconds = signal('--');
  private intervalId?: any;

  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateCountdown();
      this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const now = Date.now();
    const diff = this.targetDate - now;
    if (diff <= 0) {
      this.days.set('0');
      this.hours.set('0');
      this.minutes.set('0');
      this.seconds.set('0');
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    this.days.set(d.toString());
    this.hours.set(h.toString().padStart(2, '0'));
    this.minutes.set(m.toString().padStart(2, '0'));
    this.seconds.set(s.toString().padStart(2, '0'));
  }
}


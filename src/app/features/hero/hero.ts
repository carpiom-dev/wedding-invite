import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AudioService } from '../../core/services/audio';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute);
  audio = inject(AudioService);

  guestName = signal<string | null>(null);
  guestCount = signal<number | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.route.queryParamMap.subscribe(params => {
        const nombre = params.get('nombre');
        const invitados = params.get('invitados');
        if (nombre) this.guestName.set(decodeURIComponent(nombre));
        if (invitados) this.guestCount.set(Number(invitados));
      });
    }
  }

  toggleMusic() {
    this.audio.toggle();
  }

  scrollToDetalles() {
    if (typeof window === 'undefined') return;

    const target = document.getElementById('details');
    if (!target) return;

    const header = document.querySelector('app-header');
    const headerHeight = header ? header.clientHeight : 0;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

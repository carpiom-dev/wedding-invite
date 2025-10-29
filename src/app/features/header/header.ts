import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
   private platformId = inject(PLATFORM_ID);

  scrollToConfirmar() {
    if (!isPlatformBrowser(this.platformId)) return;

    const target = document.getElementById('rsvp');
    if (!target) return;

    const header = document.querySelector('app-header');
    const headerHeight = header ? header.clientHeight : 0;
    const offset = headerHeight + 10;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

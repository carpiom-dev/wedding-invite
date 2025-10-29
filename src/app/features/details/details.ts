import { Component, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class DetailsComponent {
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  lugar = signal('Club de Tropas de la CTE — Guayaquil');
  fecha = signal('Sabado 31 de enero de 2026');
  horaCeremonia = signal('5:00 PM (Ceremonia & Recepción)');
  mapaUrl = signal<SafeResourceUrl>('');

  bancos = signal([
    { nombre: 'Banco Pichincha', cuenta: '2211476630', tipo: 'Ahorros', titular: 'Josselyn Maruri' },
    { nombre: 'Banco Guayaquil', cuenta: '0051637865', tipo: 'Ahorros', titular: 'Josselyn Maruri' },
    { nombre: 'Banco Pacifco', cuenta: '0051637865', tipo: 'Ahorros', titular: 'Josselyn Maruri' }
  ]);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps?q=Club+de+Oficiales+CTE+Guayaquil&output=embed'
        );
        this.mapaUrl.set(safeUrl);
      }
    });
  }
}

import { Component, inject, PLATFORM_ID, afterNextRender, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

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
  fecha = signal('Sábado 31 de enero de 2026');
  horaCeremonia = signal('5:30 PM (Ceremonia & Recepción)');
  mapaUrl = signal<SafeResourceUrl>('');

  // 👇 Nueva señal para mostrar / ocultar cuentas
  mostrarCuentas = signal(false);

  bancos = signal([
    { nombre: 'Banco Pichincha', cuenta: '2211461770', tipo: 'Ahorros', titular: 'Maruri Rodríguez Josselyn Emily', email: 'emilymaruri6@gmail.com', cedula : '0944369198' },
    { nombre: 'Banco Guayaquil', cuenta: '0051637865', tipo: 'Ahorros', titular: 'Maruri Rodríguez Josselyn Emily', email: 'emilymaruri6@gmail.com', cedula : '0944369198' },
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

  // 👇 Método para alternar visibilidad
  toggleCuentas(): void {
    this.mostrarCuentas.set(!this.mostrarCuentas());
  }
}

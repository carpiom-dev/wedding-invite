import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AudioService } from './audio';

@Injectable({ providedIn: 'root' })
export class PreloaderService {
  visible = signal(true);
  private audio = inject(AudioService);
  private platformId = inject(PLATFORM_ID);

  hide() {
    this.visible.set(false);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.audio.play();
      }, 800);
    }
  }
}

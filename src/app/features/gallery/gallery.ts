import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class GalleryComponent {
  private platformId = inject(PLATFORM_ID);
  images = signal([
    'assets/img/gallery1.jpg',
    'assets/img/gallery2.jpg',
    'assets/img/gallery3.jpg',
    'assets/img/gallery4.jpg',
    'assets/img/gallery5.jpg',
    'assets/img/gallery6.jpg'
  ]);
  currentIndex = signal(0);

  next() {
    const nextIndex = (this.currentIndex() + 1) % this.images().length;
    this.currentIndex.set(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex() - 1 + this.images().length) % this.images().length;
    this.currentIndex.set(prevIndex);
  }

  // Control táctil (solo en navegador)
  private startX = 0;
  private endX = 0;

  onTouchStart(e: TouchEvent) {
    if (isPlatformBrowser(this.platformId)) this.startX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    if (isPlatformBrowser(this.platformId)) {
      this.endX = e.changedTouches[0].clientX;
      if (this.startX - this.endX > 50) this.next();
      if (this.endX - this.startX > 50) this.prev();
    }
  }
}

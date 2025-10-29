import { Component, ElementRef, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './features/header/header';
import { HeroComponent } from './features/hero/hero';
import { PreloaderComponent } from './core/ui/preloader/preloader';
import { AudioControlComponent } from './core/ui/audio-control/audio-control';
import { PreloaderService } from './core/services/preloader';
import { CountdownComponent } from './features/countdown/countdown';
import { DetailsComponent } from './features/details/details';
import { GalleryComponent } from './features/gallery/gallery';
import { FooterComponent } from './features/footer/footer';
import { AudioService } from './core/services/audio';
import { RsvpComponent } from './features/rsvp/rsvp';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ HeroComponent,  AudioControlComponent,
            CountdownComponent,DetailsComponent,GalleryComponent, FooterComponent,RsvpComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  private preloader = inject(PreloaderService);
  private el = inject(ElementRef);
  private audioService = inject(AudioService);
  constructor() {
    setTimeout(() => this.preloader.hide(), 1500);
  }
  ngOnInit() {
    const audioEl = this.el.nativeElement.querySelector('#bgAudio');
    if (audioEl) this.audioService.init(audioEl);
  }

  mostrarSobre = signal(true);

  abrirInvitacion() {
    const sobre = document.querySelector('.envelope-container');
    if (sobre) {
      sobre.classList.add('fade-out');
      setTimeout(() => this.mostrarSobre.set(false), 1500); // se oculta luego de 1.5s
    }
  }
}

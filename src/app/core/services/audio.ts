import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audio?: HTMLAudioElement;
  playing = signal(false);
  blocked = signal(false); // 🟡 nueva señal para mostrar modal

  init(el: HTMLAudioElement) {
    this.audio = el;
    this.audio.volume = 0;
  }

  async play() {
    if (!this.audio) return;

    try {
      await this.audio.play();
      this.playing.set(true);
      this.blocked.set(false);

      // 🎚️ fade-in
      let v = 0;
      const fade = setInterval(() => {
        if (!this.audio) return clearInterval(fade);
        v += 0.05;
        this.audio.volume = Math.min(v, 1);
        if (v >= 1) clearInterval(fade);
      }, 120);
    } catch (e) {
      console.warn('Autoplay bloqueado, esperando interacción.');
      this.blocked.set(true); // 🔔 activa el modal
      this.registerUserInteraction();
    }
  }

  pause() {
    if (this.audio) this.audio.pause();
    this.playing.set(false);
  }

  async toggle() {
    if (!this.audio) return;
    if (this.audio.paused) await this.play();
    else this.pause();
  }

  private registerUserInteraction() {
    const resume = async () => {
      try {
        await this.audio?.play();
        this.playing.set(true);
        this.blocked.set(false);
        window.removeEventListener('click', resume);
        window.removeEventListener('touchstart', resume);
      } catch {}
    };
    window.addEventListener('click', resume);
    window.addEventListener('touchstart', resume);
  }
}

import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AudioService } from '../../services/audio';

@Component({
  standalone: true,
  selector: 'app-audio-control',
  templateUrl: './audio-control.html',
  styleUrl: './audio-control.scss'
})
export class AudioControlComponent {
  audio = inject(AudioService);

  toggleMusic() {
    this.audio.toggle();
  }

  closeModal() {
    this.audio.blocked.set(false);
  }
}

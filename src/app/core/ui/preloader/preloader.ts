import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PreloaderService } from '../../services/preloader';

@Component({
  standalone: true,
  selector: 'app-preloader',
  imports: [],
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss'
})
export class PreloaderComponent {
  private s = inject(PreloaderService);
  visible = computed(() => this.s.visible());
}

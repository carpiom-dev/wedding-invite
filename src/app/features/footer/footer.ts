import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit() {
    const element = this.el.nativeElement;

    element.classList.add('reveal-init');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.add('reveal-visible');
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(element);
  }
}

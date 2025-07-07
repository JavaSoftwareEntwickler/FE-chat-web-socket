import { Component, ElementRef, AfterViewChecked, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auto-scroll',
  standalone: true,
  templateUrl: './auto-scroll-component.html',
  styleUrl: './auto-scroll-component.css'
})
export class AutoScrollComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef<HTMLElement>;

  // Opzionale: flag per abilitare/disabilitare l'autoscroll
  @Input() autoScrollEnabled = true;

  // Questo metodo viene chiamato dopo ogni change detection
  ngAfterViewChecked(): void {
    if (this.autoScrollEnabled) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
      console.error('AutoScroll error:', err);
    }
  }
}

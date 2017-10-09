import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
  <div class="button" [class.button_red]="danger" (click) ="performAction()">{{text}}</div>
  `,
  styleUrls: ['button.component.css']
})

export class ButtonComponent {
  @Input() danger: boolean = false;
  @Input() text: string;
  @Output() isClicked: EventEmitter<void> = new EventEmitter<void>();

  performAction() {
    this.isClicked.emit();
  } 
}

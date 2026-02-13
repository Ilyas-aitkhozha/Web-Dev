import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  styles: [`
    .btn {
      padding: 5px;
    }
  `],
  template: `<button class="btn" (click)="addItem()">Add Item</button>`,
})
export class Child {
  readonly addItemEvent = output<string>();

  addItem() {
    this.addItemEvent.emit('🐢');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Child],
  template: `
    <app-child (addItemEvent)="addItem($event)"></app-child>
    <p>🐢 all the way down {{ items.length }}</p>
  `,
})
export class App {
  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }
}

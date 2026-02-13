import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `<p>The user's name is {{ name() }}</p>`,
})
export class User {
  name = input<string>();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [User],
  template: `<app-user name="Simran"></app-user>`,
})
export class App {}

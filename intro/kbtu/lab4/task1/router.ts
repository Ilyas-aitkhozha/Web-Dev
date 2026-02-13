import { Component, ApplicationConfig } from '@angular/core';
import { Routes, RouterOutlet, provideRouter } from '@angular/router';

export const routes: Routes = [];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class App {}

import { Component, ApplicationConfig } from '@angular/core';
import { Routes, RouterOutlet, RouterLink, provideRouter } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<div>Home Page</div>`,
})
export class Home {}

@Component({
  selector: 'app-user',
  standalone: true,
  template: `<div>Username: {{ username }}</div>`,
})
export class User {
  username = 'youngTech';
}

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: Home,
  },
  {
    path: 'user',
    title: 'App User Page',
    component: User,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/user">User</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class App {}

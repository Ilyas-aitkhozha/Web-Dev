import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true,
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = '';

    for (let i = value.length - 1; i >= 0; i--) {
      reverse += value[i];
    }

    return reverse;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReversePipe],
  template: `Reverse Machine: {{ word | reverse }}`,
})
export class App {
  word = 'You are a champion';
}


import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: '<h2>{{ title  }}/h2>'
})
export class PopupComponent {
    title = "List of courses";
}
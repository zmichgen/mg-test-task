import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadItems } from './store/actions/item.actions';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'testtask';
    constructor(public store: Store) {
        store.dispatch(new LoadItems());
    }
}

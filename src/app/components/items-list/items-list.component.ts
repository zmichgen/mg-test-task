import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';
import { IItem } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAllItems } from 'src/app/store';
import { LoadItems, DeleteItemRequest } from 'src/app/store/actions/item.actions';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

    items$: Observable<IItem[]>;

    items: IItem[] = [];

    constructor(public store: Store<any>, public router: Router, public dataService: DataService) {

    }

    ngOnInit() {
        this.store.dispatch(new LoadItems());
        this.items$ = this.store.pipe(select(selectAllItems));
    }

    addItem(e) {
        this.router.navigate(['create']);
    }

    updateItem(id: string) {
        this.router.navigate(['update', id]);
    }

    deleteItem(id: string) {
        this.store.dispatch(new DeleteItemRequest({ id }));
    }

}

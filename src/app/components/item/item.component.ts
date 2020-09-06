import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IItem } from '../../models/item';
import { DataService } from 'src/app/services/data-service.service';
@Component({
    selector: 'app-item-component',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    @Input() itemName: string;
    @Input() itemDescription: string;
    @Input() itemPrice: number;
    @Input() itemId: string;
    @Output() updItem = new EventEmitter<string>();
    @Output() delItem = new EventEmitter<string>();

    constructor(public dataService: DataService) { }

    ngOnInit() {
    }

    updateItem(e) {
        this.updItem.emit(this.itemId);
    }

    deleteItem(e) {
        this.delItem.emit(this.itemId);
    }

}

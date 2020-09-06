import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IItem } from 'src/app/models/item';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data-service.service';
import { v4 as uuidv4 } from 'uuid';
import { Store, select } from '@ngrx/store';
import { AddItemRequest, UpdateItemRequest } from 'src/app/store/actions/item.actions';
import { selectItem } from 'src/app/store';


@Component({
    selector: 'app-create-item',
    templateUrl: './create-item.component.html',
    styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
    currentId = '';
    item: IItem = null;
    itemsFormGroup: FormGroup;
    hasError = false;


    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public fb: FormBuilder,
        public dataService: DataService,
        public store: Store
    ) {

    }

    ngOnInit() {
        this.createForm();
        this.currentId = this.route.snapshot.params.id;
        if (this.currentId) {
            this.store.pipe(select(selectItem, this.currentId))
                .subscribe(item => {
                    if (item) {
                        this.itemsFormGroup.patchValue({
                            itemName: item.name,
                            itemDescription: item.comment,
                            itemPrice: item.price
                        });
                    }
                });
        }
    }

    createForm() {
        this.itemsFormGroup = this.fb.group({
            itemName: new FormControl('', [Validators.required, Validators.minLength(3)]),
            itemDescription: new FormControl(),
            itemPrice: new FormControl('', Validators.required),
        });
    }

    get name() {
        return this.itemsFormGroup.get('itemName');
    }

    get price() {
        return this.itemsFormGroup.get('itemPrice');
    }

    get comment() {
        return this.itemsFormGroup.get('itemDescription');
    }

    cancel(e) {
        this.currentId = null;
        this.router.navigate(['goods']);
    }

    updateItem(e) {
        if (
            this.itemsFormGroup.get('itemName').hasError('required')
            || this.itemsFormGroup.get('itemPrice').hasError('required')
            || this.itemsFormGroup.get('itemName').hasError('minlength')
        ) {
            this.hasError = true;
            return;
        }
        const { itemName, itemDescription, itemPrice } = this.itemsFormGroup.value;
        const id = this.currentId || uuidv4();
        const item = {
            id,
            name: itemName,
            comment: itemDescription,
            price: itemPrice
        };
        if (this.currentId) {
            this.store.dispatch(new UpdateItemRequest({ item }));
        } else {
            this.store.dispatch(new AddItemRequest({ item }));
        }
        this.itemsFormGroup.reset();
        this.currentId = null;
        this.router.navigate(['goods']);
    }
}

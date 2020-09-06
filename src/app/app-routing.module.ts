import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { CreateItemComponent } from './components/create-item/create-item.component';

const routes: Routes = [
    { path: 'goods', component: ItemsListComponent },
    { path: 'create', component: CreateItemComponent },
    { path: 'update/:id', component: CreateItemComponent },
    { path: '**', redirectTo: 'goods' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

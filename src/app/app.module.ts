import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ItemComponent } from './components/item/item.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { DataService } from './services/data-service.service';
import { MockDataInterceptor } from './interceptors/mock-data.interceptor';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { EffectsModule } from '@ngrx/effects';
import { ItemEffects } from './store/effects/item.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/item.reducers';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ItemComponent,
        ItemsListComponent,
        CreateItemComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([ItemEffects]),
        StoreModule.forRoot({ items: reducer })
    ],
    providers: [
        DataService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockDataInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

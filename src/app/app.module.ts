import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ToastComponent } from './components/toast/toast.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        CatalogComponent,
        ProductComponent,
        CartComponent,
        LoadingComponent,
        ErrorComponent,
        ProductCardComponent,
        ToastComponent,
        CartProductComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

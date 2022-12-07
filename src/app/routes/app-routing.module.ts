import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from '../components/product/product.component';
import { CatalogComponent } from '../components/catalog/catalog.component';
import { CartComponent } from '../components/cart/cart.component';



const routes: Routes = [
    { path: '', redirectTo: '/catalog', pathMatch: 'full' },
    { path: 'catalog', component: CatalogComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'cart', component: CartComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

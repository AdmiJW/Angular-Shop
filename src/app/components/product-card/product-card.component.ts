import { Component, Input } from '@angular/core';

import { IProduct } from 'src/models/IProduct';


import { CartService } from 'src/app/services/cart/cart.service';
import { AppToastService } from 'src/app/services/toast/toast.service';


@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
    @Input() product!: IProduct;

    constructor(
        private _cartService: CartService,
        private _toastService: AppToastService,
    ) {}


    addToCart(): void {
        this._cartService.addToCart(this.product.id);
        this._toastService.show('Success', `${this.product.title} (x1) added to cart`);
    }
}

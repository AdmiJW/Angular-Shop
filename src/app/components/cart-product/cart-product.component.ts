import { Component, Input } from '@angular/core';


import { IProductWithQuantity } from 'src/models/IProduct';

import { CartService } from 'src/app/services/cart/cart.service';
import { AppToastService } from 'src/app/services/toast/toast.service';

@Component({
    selector: 'app-cart-product',
    templateUrl: './cart-product.component.html',
    styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {
    @Input() product!: IProductWithQuantity;
    @Input() quantity!: number;


    constructor(
        private _cartService: CartService,
        private _toastService: AppToastService,
    ) {}

    
    removeProduct(): void {
        this._cartService.removeFromCart(this.product.id);
        this._toastService.show('Success', 'Product removed from cart');
    }
}

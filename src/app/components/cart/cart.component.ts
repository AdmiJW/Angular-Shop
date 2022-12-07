import { Component } from '@angular/core';
import { catchError, defaultIfEmpty, finalize, forkJoin, of, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductWithQuantity } from 'src/models/IProduct';
import { ICartItem } from 'src/app/services/cart/cart.service';

import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AppToastService } from 'src/app/services/toast/toast.service';
import { LoadingComponent } from '../loading/loading.component';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    private _subscription: Subscription | null = null;

    isLoading: boolean = false;
    isError: boolean = false;
    cartProducts: IProductWithQuantity[] = [];
    total: number = 0;

    constructor(
        private _productService: ProductService,
        private _cartService: CartService,
        private _toastService: AppToastService,
        private _modalService: NgbModal,
    ) {}


    ngOnInit(): void {
        this._subscription = this._cartService
            .cartItems
            .subscribe(this.updateProducts.bind(this));
    }

    ngOnDestroy(): void {
        this._subscription!.unsubscribe();
    }



    public openConfirmation(content: any) {
		this._modalService
            .open(content, { ariaLabelledBy: 'modal-confirmation' })
            .result
            .then((closeResult) => {
                if (closeResult === 'Confirm') this.checkout();
            }, (dismissReason) => {});
	}

    public clearCart(): void {
        this._cartService.clearCart();
        this._toastService.show('Success', 'Cart cleared');
    }

    public checkout(): void {
        this._cartService.clearCart();
        this._toastService.show('Success', 'Checkout successful. Thank you for your purchase!');
    }







    private updateProducts(cartItems: ICartItem[]): void {
        this.isLoading = true;

        forkJoin( 
            cartItems.map(item => this._productService.getProductByIdWithQuantity(item.id, item.quantity))
        )
        .pipe(
            defaultIfEmpty([]),
            catchError(err => {
                this.onError("Error while fetching cart error. See console for more details", err);
                return of([]);
            }),
            finalize(() => this.isLoading = false),
        )
        .subscribe((products: IProductWithQuantity[]) => {
            if (!products) this.onError('No item found (null)');
            this.cartProducts = products;
            this.total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        });
    }


    private onError(msg: string, err: any = null): void {
        if (err) console.error(err);
        this.isError = true;
        this._toastService.show('Error', msg);
    }
}

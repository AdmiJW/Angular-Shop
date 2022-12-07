import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, finalize } from 'rxjs';


import { ProductService } from 'src/app/services/product/product.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { AppToastService } from 'src/app/services/toast/toast.service';


import { IProduct } from 'src/models/IProduct';


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent { 
    isLoading: boolean = false;
    isError: boolean = false;
    public product: IProduct | null = null;


    constructor(
        private _productService: ProductService,
        private _cartService: CartService,
        private _toastService: AppToastService,
        private _route: ActivatedRoute,
    ) {}
    

    ngOnInit(): void {
        this._route.params.subscribe(params => {
            const productId = params['id'];

            if (!productId) {
                this.isError = true;
                return;
            }

            this.isLoading = true;

            this._productService
                .getProductById(productId)
                .pipe(
                    catchError(err => {
                        this.onError('Error fetching product. See console for details', err);
                        return of(null);
                    }),
                    finalize(() => this.isLoading = false)
                )
                .subscribe(product => {
                    if (!product) this.onError("No product found (null)");
                    this.product = product;
                });
        });
    }


    public addToCart(): void {
        if (!this.product) return;
        this._cartService.addToCart(this.product.id);
        this._toastService.show('Success', this.product.title + ' (x1) added to cart');
    }



    private onError(msg: string, err: any = null): void {
        if (err) console.error(err);
        this.isError = true;
        this._toastService.show('Error', msg);
    }
}

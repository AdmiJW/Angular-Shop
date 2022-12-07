import { Component } from '@angular/core';
import { catchError, of, finalize } from 'rxjs';


import { IProduct } from 'src/models/IProduct';
import { ProductService } from 'src/app/services/product/product.service';
import { AppToastService } from 'src/app/services/toast/toast.service';


@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
    isLoading: boolean = false;
    isError: boolean = false;
    products: IProduct[] = [];

    constructor(
        private _productService: ProductService,
        private _toastService: AppToastService
    ) {}


    ngOnInit(): void {
        this.isLoading = true;

        // On mount, fetch list of products
        this._productService
            .getAllProducts()
            .pipe(
                catchError(err => {
                    this.onError('Error fetching products. See console for details', err);
                    return of([]);
                }),
                finalize(() => this.isLoading = false)
            )
            .subscribe((products: IProduct[]) => {
                if (!products) this.onError('No products found (null)');
                this.products = products;
            });
    }



    private onError(msg: string, err: any = null): void {
        if (err) console.error(err);
        this.isError = true;
        this._toastService.show('Error', msg);
    }
}

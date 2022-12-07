import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


import { IProduct, IProductWithQuantity } from 'src/models/IProduct';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private _baseUrl: string = "https://fakestoreapi.com/products";


    constructor(
        private _http: HttpClient,
    ) {}


    public getAllProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._baseUrl);
    }

    public getProductById(id: number): Observable<IProduct> {
        return this._http.get<IProduct>(`${this._baseUrl}/${id}`);
    }

    public getProductByIdWithQuantity(id: number, quantity: number): Observable<IProductWithQuantity> {
        return this.getProductById(id)
            .pipe( map(product => ({ ...product, quantity })) );
    }
}

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


export interface ICartItem {
    id: number;
    quantity: number;
}


@Injectable({
    providedIn: 'root'
})
export class CartService {
    private _cartItems: ICartItem[] = [];
    public cartItems = new BehaviorSubject<ICartItem[]>([]);


    public addToCart(productId: number, quantity: number = 1): void {
        const item = this._cartItems.find(item => item.id === productId);
        if (item) item.quantity += quantity;
        else this._cartItems.push({ id: productId, quantity });

        this.cartItems.next(this._cartItems);
    }

    public removeFromCart(productId: number): void {
        this._cartItems = this._cartItems.filter(item => item.id !== productId);

        this.cartItems.next(this._cartItems);
    }

    public updateQuantity(productId: number, quantity: number): void {
        if (quantity <= 0) return this.removeFromCart(productId);

        const item = this._cartItems.find(item => item.id === productId);
        if (!item) return;
        
        item.quantity = quantity;
        this.cartItems.next(this._cartItems);
    }
        

    public clearCart(): void {
        this._cartItems = [];
        this.cartItems.next(this._cartItems);
    }
}

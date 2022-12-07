import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    public url: string = "";


    public constructor(
        private _router: Router,
    ) {}


    private ngOnInit() {
        // Subscribe to route path changes
        this._router.events.subscribe((e) => {
            if (!(e instanceof NavigationEnd)) return;
            this.url = e.urlAfterRedirects;
        });
    }

}

import { Component } from '@angular/core';


import { AppToastService } from 'src/app/services/toast/toast.service';


@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
    constructor(
        public toastService: AppToastService
    ) {}
}

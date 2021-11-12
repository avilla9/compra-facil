import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { WoocommerceService } from '../../services/woocommerce.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonContent, { static: false }) content: IonContent;

    Products: any = [];
    page: number = 1;
    top: any;

    constructor(private woocommerceService: WoocommerceService) {
    }

    ngOnInit() {
        this.ionViewDidEnter(false, "");
    }

    ionViewDidEnter(isFirstLoad, event) {

        this.woocommerceService
            .getProductList(this.page)
            .subscribe((res) => {
                console.log(res);
                this.Products = [...this.Products, ...res];
                if (isFirstLoad)
                    event.target.complete();
                this.page++;
            });
    }

    doInfinite(event) {
        console.log("Load more: ", this.top);
        this.ionViewDidEnter(true, event);
    }
}

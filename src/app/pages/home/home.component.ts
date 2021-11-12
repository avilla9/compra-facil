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
                this.Products = res;
                if (isFirstLoad)
                    event.target.complete();
                this.page++;
            });
    }

    logScrolling(event) {
        console.log("logScrollStart : When Scroll Starts", event.detail.scrollTop);
        this.top = event.detail.scrollTop;
    }

    ScrollToPoint(X, Y) {
        this.content.scrollToPoint(X, Y, 200);
    }

    doInfinite(event) {
        console.log("Load more: ", this.top);
        this.ionViewDidEnter(true, event);
        this.ScrollToPoint(0, this.top - 200);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
}

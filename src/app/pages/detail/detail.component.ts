import { Component, OnInit } from '@angular/core';
import { WoocommerceService } from '../../services/woocommerce.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  id: any;
  Product: any = [];
  lastItemTop: any;

  constructor(
    private woocommerceService: WoocommerceService,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProductData(this.id);
  }

  getProductData(id) {
    this.woocommerceService.getProduct(id).subscribe(res => {
      console.log(res);
      this.Product = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(
    private basketService: BasketService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.getBrands();
  }

  getBrands() {
    this.shopService.getBrandsFromMemory().subscribe((brands) => {
      console.log('brands from nav: ', brands);
    });
  }
}

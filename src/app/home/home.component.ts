import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.shopService.getBrandsFromMemory().subscribe((brands) => {
      console.log('brands from home: ', brands);
    });
  }
}

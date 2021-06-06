import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor() {}

  ngOnInit(): void {
    // this.http.get<IPagination>('https://localhost:5001/api/products').subscribe((response: IPagination) => {
    //   this.products = response.data;
    //   console.log('products: ', this.products);
    // }, error => {
    //   console.log('an error occured: ', error);
    // });
  }
}

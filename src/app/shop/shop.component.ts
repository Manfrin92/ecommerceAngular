import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
    @ViewChild('search', { static: true }) searchTerm: ElementRef;
    products: IProduct[];
    brands: IBrand[];
    types: IType[];
    shopParams = new ShopParams();
    totalCount: number;

    sortOptions = [
        { name: 'Alphabetical', value: 'name' },
        { name: 'Price: Low to High', value: 'priceAsc' },
        { name: 'Price: High to Low', value: 'priceDesc' },
    ];

    constructor(private shopService: ShopService) {}

    ngOnInit() {
        this.getProducts();
        this.getBrands();
        this.getTypes();
    }

    getProducts() {
        this.shopService.getProducts(this.shopParams).subscribe(
            (response) => {
                this.products = response?.data ? response.data : [];
                this.shopParams.pageNumber = response?.pageIndex
                    ? response?.pageIndex
                    : 0;
                this.shopParams.pageSize = response?.pageSize
                    ? response.pageSize
                    : 0;
                this.totalCount = response?.count ? response.count : 0;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getBrands() {
        this.shopService.getBrands().subscribe(
            (response) => {
                this.brands = [{ id: 0, name: 'All' }, ...response];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getTypes() {
        this.shopService.getTypes().subscribe(
            (response) => {
                this.types = [{ id: 0, name: 'All' }, ...response];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onBrandSelected(brandId: number) {
        this.shopParams.brandId = brandId;
        this.getProducts();
    }

    onTypeSelected(typeId: number) {
        this.shopParams.typeId = typeId;
        this.getProducts();
    }

    onSortSelected(sort: string) {
        // this.sortSelected = sort;
        this.getProducts();
    }

    onPageChanged(event: any) {
        this.shopParams.pageNumber = event;
        this.getProducts();
    }

    onSearch() {
        this.shopParams.search = this.searchTerm.nativeElement.value;
        this.getProducts();
    }

    onReset() {
        this.searchTerm.nativeElement.value = '';
        this.shopParams = new ShopParams();
        this.getProducts();
    }
}

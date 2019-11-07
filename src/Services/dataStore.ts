import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settings } from 'src/settings';
import { Company } from 'src/Models/company';
import { resolve } from 'url';
import { reject } from 'q';
import { Product } from 'src/Models/product';

@Injectable()
export class DataStore {

    companies: Company[];
    allProducts: Product[];

    constructor(private httpClient: HttpClient) {
        this.getCompanies().then(value => {
            this.companies = value;
            this.getProducts();
        });
    }

    getCompanies(): Promise<Company[]> {
        return new Promise((resolve, reject) => {
            if (this.companies != null)
                resolve(this.companies);
            else {

                this.httpClient.get(`${settings.currentApiUrl}/api/companies`)
                    .subscribe(
                        (response: Company[]) => {
                            resolve(response);
                        },
                        error => {
                            reject([])
                        }
                    );
            }
        },
        )
    }

    getProducts() {
        this.allProducts = [];
        for (const company of this.companies) {
            for (const category of company.categories) {
                for (const subCategory of category.subCategories) {
                    this.allProducts.push(...subCategory.products);
                }
            }
        }
        console.log(this.allProducts);
    }

}
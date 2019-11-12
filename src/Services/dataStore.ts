import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { settings } from 'src/settings';
import { Company } from 'src/Models/company';
import { resolve } from 'url';
import { reject } from 'q';
import { Product } from 'src/Models/product';
import { Video } from 'src/Models/video';
import * as database from '../assets/database/database.json';

@Injectable()
export class DataStore {

    companies: Company[];
    allProducts: Product[];
    videos: Video[];

    constructor(private httpClient: HttpClient) {
        this.allProducts = [];
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
                // this.httpClient.get(`${settings.currentApiUrl}/api/companies`)
                //     .subscribe(
                //         (response: Company[]) => {
                //             resolve(response);
                //         },
                //         error => {
                //             reject([])
                //         }
                //     );
                resolve(database.companies as Company[]);
            }
        },
        )
    }

    getProducts(): Promise<Product[]> {
        return this.getCompanies().then(value => {
            this.companies = value;
            return new Promise<Product[]>((resolve, reject) => {
                try {
                    if (this.allProducts.length == 0) {
                        for (const company of this.companies) {
                            for (const category of company.categories) {
                                for (const subCategory of category.subCategories) {
                                    this.allProducts.push(...subCategory.products);
                                }
                            }
                        }
                    }
                    resolve(this.allProducts);
                } catch (error) {
                    reject([]);
                }
            });
        }).catch(error => { return null })

    }

    getVideos(): Promise<Video[]> {
        return new Promise((resolve, reject) => {
            if (this.videos != null)
                resolve(this.videos);
            else {
                // this.httpClient.get(`${settings.currentApiUrl}/api/videos`)
                //     .subscribe(
                //         (response: Video[]) => {
                //             resolve(response);
                //         },
                //         error => {
                //             reject([])
                //         }
                //     );
                resolve(database.videos as Video[]);
            }
        },
        )
    }

}
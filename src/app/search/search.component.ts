import { Component, OnInit } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';
import { Product } from 'src/Models/product';
import { ActivatedRoute, Params } from '@angular/router';
import { Company } from 'src/Models/company';
import { Category } from 'src/Models/category';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  /*
    search types are company,category,subcategory
   */
  pageSize = 10;
  pageNumber: number;

  allCompanies: Company[];
  allProducts: Product[];

  searchedProducts: Product[];

  company: string;
  category: string;
  subCategory: string;

  constructor(public dataStore: DataStore, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.company = params['company'];
      this.category = params['category'];
      this.subCategory = params['subCategory'];

      this.dataStore.getCompanies().then(data => {
        this.allCompanies = data;
        if (this.company)
          this.search(this.company, this.category, this.subCategory);
        else
          this.wordSearch("");
      })
    });
  }

  search(companyName, categoryName, subCategoryName) {
    this.searchedProducts = [];
    if (companyName) {
      var company: Company = this.allCompanies.filter(i => i.companyName == companyName)[0];

      if (categoryName) {
        var category: Category = company.categories.filter(i => i.categoryName == categoryName)[0];

        if (subCategoryName) {
          var subCategory = category.subCategories.filter(i => i.categoryName == subCategoryName)[0];
          this.searchedProducts.push(...subCategory.products);
          return;
        }

        for (const subCategory of category.subCategories) {
          this.searchedProducts.push(...subCategory.products);
        }
        return;
      }

      for (const category of company.categories) {
        for (const subCategory of category.subCategories) {
          this.searchedProducts.push(...subCategory.products);
        }
      }
      return;
    }
  }

  wordSearch(word:string){

  }

}

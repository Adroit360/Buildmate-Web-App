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
  _pageNumber: number = 1;

  get PageNumber(): number {
    return this._pageNumber
  }

  set pageNumber(pNumber: number) {
    if (Number.isNaN(pNumber))
      pNumber = 1;
    this._pageNumber = pNumber;
    this.getVisibleSearchedProducts((this._pageNumber - 1) * this.pageSize, this.pageSize);
  }


  allCompanies: Company[];
  allProducts: Product[];

  searchedProducts: Product[];
  visibleSearchedProducts: Product[];

  company: string;
  category: string;
  subCategory: string;
  word: string;

  constructor(public dataStore: DataStore, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.company = params['company'];
      this.category = params['category'];
      this.subCategory = params['subCategory'];
      this.word = params['word'];

      this.dataStore.getCompanies().then(data => {
        this.allCompanies = data;
        if (this.company) {
          this.search(this.company, this.category, this.subCategory);
        }
        else {
          this.wordSearch(this.word);
        }
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

  wordSearch(word: string) {
    this.searchedProducts = [];
    if (word) {
      var companies: Company[] = this.allCompanies.filter(i => i.companyName.toLowerCase() == word.toLowerCase());
      if (companies.length == 1)
        return this.search(companies[0].companyName, undefined, undefined);
      else if (companies.length == 0)
        companies = this.allCompanies;

      console.log("companies");
      console.log(companies);

      for (const company of companies) {
        var categories: Category[] = company.categories.filter(i => i.categoryName.toLowerCase() == word.toLowerCase());
        if (categories.length == 1)
          return this.search(company.companyName, categories[0].categoryName, undefined)
        else if (categories.length == 0)
          categories = company.categories;

        console.log("Categories");
        console.log(categories);


        for (const category of categories) {
          var subCategories = category.subCategories.filter(i => i.categoryName.toLowerCase() == word.toLowerCase());
          if (subCategories.length == 1)
            return this.search(company.companyName, categories[0].categoryName, subCategories[0].categoryName)
          if (subCategories.length == 0)
            subCategories = category.subCategories;

          console.log("subCategories");
          console.log(subCategories);

          for (const subCategory of subCategories) {
            this.searchedProducts.push(...subCategory.products.filter(i => i.productName.toLowerCase().includes(word.toLowerCase())));

            console.log("this.searchedProducts");
            console.log(this.searchedProducts);
          }
        }
      }
    }
  }

  getVisibleSearchedProducts(skip: number, take: number) {
    this.visibleSearchedProducts = this.searchedProducts.slice(skip, skip + take);
  }

}

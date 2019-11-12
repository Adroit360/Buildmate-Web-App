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
  navText: string;
  constructor(public dataStore: DataStore, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.company = this.activatedRoute.snapshot.params['company'];
    this.category = this.activatedRoute.snapshot.params['category'];
    this.subCategory = this.activatedRoute.snapshot.params['subCategory'];
    this.word = this.activatedRoute.snapshot.params['word'];
    this.getCompanies();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.company = params['company'];
      this.category = params['category'];
      this.subCategory = params['subCategory'];
      this.word = params['word'];

      this.getCompanies();
    });

  }

  getCompanies() {
    this.dataStore.getCompanies().then(data => {
      this.allCompanies = data;
      if (this.company) {
        this.search(this.company, this.category, this.subCategory);
      }
      else {
        this.wordSearch(this.word);
      }

      this.setNavText(this.company, this.category, this.subCategory, this.word);
      this.pageNumber = 1;
    })
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

  setNavText(companyName, categoryName, subCategoryName, word) {
    if (subCategoryName)
      this.navText = subCategoryName
    else if (categoryName)
      this.navText = categoryName
    else if (companyName)
      this.navText = companyName
    else if (word)
      this.navText = word == "***" ? "All Products" : word;
  }

  wordSearch(word: string) {
    this.searchedProducts = [];
    if (word) {

      if (word.toLowerCase() == "***") {
        this.dataStore.getProducts().then(data => {
          this.searchedProducts = data;
        })
        return;
      }

      var companies: Company[] = this.allCompanies.filter(i => i.companyName.toLowerCase() == word.toLowerCase());
      if (companies.length == 1)
        return this.search(companies[0].companyName, undefined, undefined);
      else if (companies.length == 0)
        companies = this.allCompanies;

      for (const company of companies) {
        var categories: Category[] = company.categories.filter(i => i.categoryName.toLowerCase() == word.toLowerCase());
        if (categories.length == 1)
          return this.search(company.companyName, categories[0].categoryName, undefined)
        else if (categories.length == 0)
          categories = company.categories;

        for (const category of categories) {
          var subCategories = category.subCategories.filter(i => i.categoryName.toLowerCase() == word.toLowerCase());
          if (subCategories.length == 1)
            return this.search(company.companyName, categories[0].categoryName, subCategories[0].categoryName)
          if (subCategories.length == 0)
            subCategories = category.subCategories;

          for (const subCategory of subCategories) {
            this.searchedProducts.push(...subCategory.products.filter(i => i.productName.toLowerCase().includes(word.toLowerCase())));
          }
        }
      }
    }
  }

  getVisibleSearchedProducts(skip: number, take: number) {
    this.visibleSearchedProducts = this.searchedProducts.slice(skip, skip + take);
  }

  getRandomColor(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  }

}

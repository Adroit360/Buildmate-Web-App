import { Product } from './product';
import { Category } from './category';

export class SubCategory{
    subCategoryId : number;

    categoryName : string;

    categoryIdFk : number;

    category : Category;

    products : Product[];

}
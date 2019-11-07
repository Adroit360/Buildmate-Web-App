import { SubCategory } from './subcategory';
import { Company } from './company';

export class Category{
        categoryId : number;

        categoryName : string;

        companyIdFk : number;

        company : Company;

        subCategories : SubCategory[];
}
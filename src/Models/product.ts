import { SubCategory } from './subcategory';

export class Product{
     productId : number;
     
     productName : string;

     productCode : string;

     description : string;

     colour : string;

     packSize : string;

     boxQty : string;

     boxes_Pallet : string;


     relatedProducts : string;

     productExplanation : string;

     imageUrl : string;

     videoIds : string;
     documentIds : string;

     subCategoryIdFk : number;

     subCategory : SubCategory;
}
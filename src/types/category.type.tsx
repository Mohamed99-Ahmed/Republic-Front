interface productType {
    createdAt:string,
    _id: string,
    name: string,
    id: number,
    price: number | {
        single: number;
        double: number;
    },
    imageCover: string,
    description: string
}

interface categoryType   {
    createdAt: string,
    _id: string,
    categoryName: string,
     countProducts: number,
     products: productType[],
    id: string,
}
 type categoriesType = categoryType[];
 export default categoryType
// Export the interfaces and type
export type { productType, categoryType, categoriesType};
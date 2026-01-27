export interface Category {
    categoryId: string;
    categoryName: string;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageUrl: string;
    category: Category;
}
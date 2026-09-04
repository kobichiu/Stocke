import type { Product } from "../products.ts";

export const productService = {

    // get all the saved products
    getAll: (): Product[] => {
        try {
            return JSON.parse(localStorage.getItem("products") || "[]");
        } catch {
            return [];
        }
    },

    // add a new product
    add: (product: Product) => {
        const existing: Product[] = productService.getAll();
        existing.push(product);
        localStorage.setItem("products", JSON.stringify(existing));
    },

    // update the existing product list
    update(id: string, updatedProduct: Product): void {
        const products = productService.getAll();

        const updatedProducts = products.map((item) =>
            item.id === id ? updatedProduct : item
        );

        localStorage.setItem("products", JSON.stringify(updatedProducts));
    },

    // get the specific existing product
    getById(id: string): Product | undefined {
        return productService.getAll().find((item: Product) => item.id === id);
    },

    delete:(id: string) => {
        const products = productService.getAll();
        const updatedList = products.filter((item: Product) => item.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedList));

    }



}
// src/services/productService.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { productService } from "./productService";
import type { Product } from "../products";

const sampleProduct: Product = {
    id: "1",
    dateAdded: "2026-07-01T00:00:00.000Z",
    brand: "Medicube",
    product: "Serum",
    volume: 30,
    price: 20,
    usageCondition: "using",
    productCategory: "facial_serum",
    dateBought: "2026-07-01",
    quantity: 1,
    bestBefore: "2027-07-01",
    dateOpen: "2026-07-10",
    dateEmpty: "",
    periodAfterOpen: 12,
    note: "Nice texture",
    image: "",
};

beforeEach(() => {
    localStorage.clear();
});

describe("productService", () => {
    it("adds a product", () => {
        productService.add(sampleProduct);

        expect(productService.getAll()).toEqual([sampleProduct]);
    });

    it("gets a product by id", () => {
        productService.add(sampleProduct);

        expect(productService.getById("1")).toEqual(sampleProduct);
    });

    it("updates a product", () => {
        productService.add(sampleProduct);

        productService.update("1", {
            ...sampleProduct,
            product: "Updated Serum",
        });

        expect(productService.getById("1")?.product).toBe("Updated Serum");
    });

    it("deletes a product", () => {
        productService.add(sampleProduct);

        productService.delete("1");

        expect(productService.getAll()).toEqual([]);
    });
});

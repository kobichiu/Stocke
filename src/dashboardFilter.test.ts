import { afterEach, describe, expect, it, vi } from "vitest";
import {
    expired,
    expiringInMonths,
    sortAddedNewToOld,
    sortAddedOldToNew,
    sortPriceHighToLow,
    sortPriceLowToHigh,
} from "./dashboardFilter";
import type { Product } from "./products";

function makeProduct(overrides: Partial<Product> = {}): Product {
    return {
        id: "1",
        dateAdded: "2026-08-01T12:00:00.000Z",
        brand: "Test brand",
        product: "Test product",
        volume: 30,
        price: 20,
        usageCondition: "using",
        productCategory: "facial_serum",
        isOpened: false,
        dateBought: "",
        dateOpen: "",
        dateExpire: "",
        dateEmpty: "",
        paoMonths: 0,
        note: "",
        image: "",
        ...overrides,
    };
}

afterEach(() => {
    vi.useRealTimers();
});

describe("expiry filters", () => {
    it("includes a product expiring within three months", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-25T12:00:00.000Z"));

        const product = makeProduct({
            dateExpire: "2026-10-01",
        });

        expect(expiringInMonths(3, [product])).toEqual([product]);
    });

    it("excludes a product expiring after the selected period", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-25T12:00:00.000Z"));

        const product = makeProduct({
            dateExpire: "2027-01-01",
        });

        expect(expiringInMonths(3, [product])).toEqual([]);
    });

    it("returns products whose explicit expiry date has passed", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-25T12:00:00.000Z"));

        const expiredProduct = makeProduct({
            dateExpire: "2026-08-01",
        });

        const validProduct = makeProduct({
            id: "2",
            dateExpire: "2026-12-01",
        });

        expect(expired([expiredProduct, validProduct])).toEqual([expiredProduct]);
    });

    it("ignores products that are empty or given away", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-25T12:00:00.000Z"));

        const emptyProduct = makeProduct({
            usageCondition: "empty",
            dateExpire: "2026-08-01",
        });

        expect(expired([emptyProduct])).toEqual([]);
    });
});

describe("sorting", () => {
    const cheap = makeProduct({
        id: "cheap",
        price: 5,
        dateAdded: "2026-01-01T12:00:00.000Z",
    });

    const expensive = makeProduct({
        id: "expensive",
        price: 50,
        dateAdded: "2026-08-01T12:00:00.000Z",
    });

    it("sorts price from high to low", () => {
        expect(sortPriceHighToLow([cheap, expensive])).toEqual([
            expensive,
            cheap,
        ]);
    });

    it("sorts price from low to high", () => {
        expect(sortPriceLowToHigh([expensive, cheap])).toEqual([
            cheap,
            expensive,
        ]);
    });

    it("sorts newest additions first", () => {
        expect(sortAddedNewToOld([cheap, expensive])).toEqual([
            expensive,
            cheap,
        ]);
    });

    it("sorts oldest additions first", () => {
        expect(sortAddedOldToNew([expensive, cheap])).toEqual([
            cheap,
            expensive,
        ]);
    });
});
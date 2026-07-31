import type {Product, ProductCategory, UsageCondition} from "./products.ts";

// type SelectedTag = UsageCondition | ProductCategory | ExpiryFilters | null;

export const uniqueRecordedProductCategory = (products: Product[]) => {
    return Array.from(
        new Set(products.map((item) => item.productCategory))
    ) as ProductCategory[];
};

export const uniqueRecordedUsageCondition = (products: Product[]) => {
    return Array.from(
        new Set(products.map((item) => item.usageCondition))
    ) as UsageCondition[];
};

export function filterProducts(products: Product[], selectedTag: "using" | "to_be_used" | "empty" | "gave_away" | "body_lotion" | "body_oil" | "body_shampoo" | "body_scrub" | "eye_cream" | "facial_cream" | "face_mask" | "facial_serum" | "facial_wash" | "hand_soap" | "toner" | "hair_shampoo" | "hair_conditioner" | "hair_oil" | "hair_treatment" | "handcream" | "mouth_wash" | "sun_screen" | "tooth_paste" | "dental_floss" | "toilet_paper" | "foot_care" | 3 | 6 | 12 | "expired" | null): Product[] {
    if (selectedTag === null) {
        return products;
    }

    if (typeof selectedTag === "number") {
        return expiringInMonths(selectedTag, products);
    }

    if (selectedTag === "expired") {
        return expired(products);
    }

    return products.filter(
        (product) =>
            product.usageCondition === selectedTag ||
            product.productCategory === selectedTag
    );
}

// filters for expiring in 3/6/12 months
export function expiringInMonths(month: number, products: Product[]) {
    const availableProducts = products.filter(product => product.usageCondition === "using" || product.usageCondition === "to_be_used");
    const openDate = availableProducts.map(product => product.dateOpen);
    const expDate = availableProducts.map(product => product.dateExpire);
    const pao = availableProducts.map(product => product.paoMonths);

    const result: Product[] = [];
    const today = new Date();
    const monthsAfterToday = new Date(today);
    monthsAfterToday.setMonth(today.getMonth() + month);

    let i: number = 0;
    for (i; i < pao.length; i++) {
        const exp = new Date(expDate[i]);
        const open = new Date(openDate[i]);
        open.setMonth(open.getMonth() + pao[i]);
        const expiryDate = open; // decided by openDate and PAO

        if (
            (openDate[i] == "" && expDate[i] == "" && pao[i] == 0) || // all 3 infos are missing
            (openDate[i] == "" && expDate[i] == "" && pao[i] !== 0) || // only PAO is given
            (openDate[i] !== "" && expDate[i] == "" && pao[i] == 0) // only openDate is given
        ) {
            continue;
        } else if (
            (openDate[i] == "" && expDate[i] !== "" && pao[i] == 0) || // only EXP is given
            (openDate[i] == "" && expDate[i] !== "" && pao[i] !== 0) || // only openDate is missing
            (openDate[i] !== "" && expDate[i] !== "" && pao[i] == 0) // only PAO is missing
        ) {
            if (exp >= today && exp <= monthsAfterToday) {
                result.push(availableProducts[i]);
            }
        } else if (openDate[i] !== "" && expDate[i] == "" && pao[i] !== 0) { // only EXP is missing
            if (expiryDate >= today && expiryDate <= monthsAfterToday) {
                result.push(availableProducts[i]);
            }
        } else if (openDate[i] !== "" && expDate[i] !== "" && pao[i] !== 0) { // all 3 are present
            if (exp >= today && exp <= expiryDate && exp <= monthsAfterToday) {
                result.push(availableProducts[i]);
            } else if (expiryDate >= today && expiryDate <= exp && expiryDate <= monthsAfterToday) {
                result.push(availableProducts[i]);
            }
        }
    }
    console.log(`result looks like so for ${month} months`, result);
    return result;
}

{/* 4. expired */}
export function expired(products: Product[]) {
    const availableProducts = products.filter(product => product.usageCondition === "using" || product.usageCondition === "to_be_used");
    const openDate = availableProducts.map(product => product.dateOpen);
    const expDate = availableProducts.map(product => product.dateExpire);
    const pao = availableProducts.map(product => product.paoMonths);

    const result: Product[] = [];
    const today = new Date();

    let i: number = 0;
    for (i; i < pao.length; i++) {
        const exp = new Date(expDate[i]); // calculated by EXP
        const open = new Date(openDate[i]);
        open.setMonth(open.getMonth() + pao[i]);
        const expiryDate = open; // calculated by openDate and PAO
        if ( // unknown
            (openDate[i] == "" && expDate[i] == "" && pao[i] == 0) || // all 3 infos are missing
            (openDate[i] == "" && expDate[i] == "" && pao[i] !== 0) || // only PAO is given
            (openDate[i] !== "" && expDate[i] == "" && pao[i] == 0) // only openDate is given
        ) {
            continue;
        } else if ( // decided by EXP
            (openDate[i] == "" && expDate[i] !== "" && pao[i] == 0) || // only EXP is given
            (openDate[i] == "" && expDate[i] !== "" && pao[i] !== 0) || // only openDate is missing
            (openDate[i] !== "" && expDate[i] !== "" && pao[i] == 0) // only PAO is missing
        ) {
            if (exp < today) {
                result.push(availableProducts[i]);
            }
        } else if (openDate[i] !== "" && expDate[i] == "" && pao[i] !== 0) { //decided by PAO
            if (expiryDate < today) {
                result.push(availableProducts[i]);
            }
        } else if (openDate[i] !== "" && expDate[i] !== "" && pao[i] !==0) {
            if (exp <= expiryDate && exp < today) {
                result.push(availableProducts[i]);
            } else if (expiryDate < exp && expiryDate < today) {
                result.push(availableProducts[i]);
            }
        }
    }
    return result;
}



{/* 5. added from newest to oldest */}
{/* 6. added from oldest to newest */}
{/* 7. price high to low */}
{/* 8. price low to high */}
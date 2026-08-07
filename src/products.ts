// type of "Product" item
export type Product = {
    id: string;
    dateAdded: string;
    brand: string;
    product: string;
    volume: number;
    price: number;
    usageCondition: UsageCondition;
    productCategory: ProductCategory;
    isOpened: boolean;

    dateBought: string;
    dateOpen: string;
    dateExpire: string;
    dateEmpty: string;

    paoMonths: number; // 6, 12, 24

    note: string;
    // localStorage can store only string
    image: string;
};

export type UsageCondition =
    | "using"
    | "to_be_used"
    | "empty"
    | "gave_away";

export type ProductCategory =
    | "body_lotion"
    | "body_oil"
    | "body_shampoo"
    | "body_scrub"
    | "eye_cream"
    | "facial_cream"
    | "face_mask"
    | "facial_serum"
    | "facial_wash"
    | "hand_soap"
    | "toner"
    | "hair_shampoo"
    | "hair_conditioner"
    | "hair_oil"
    | "hair_treatment"
    | "handcream"
    | "mouth_wash"
    | "sun_screen"
    | "tooth_paste"
    | "dental_floss"
    | "toilet_paper"
    | "foot_care";

export type SortBy =
    | "added_new_to_old"
    | "added_old_to_new"
    | "price_high_to_low"
    | "price_low_to_high"

export type ExpiryMonths = 3 | 6 | 12;

export type ExpiryFilters =
    | ExpiryMonths
    | "expired" ;

export const usageOptions: Record<UsageCondition, string> = {
    using:        "Using",
    to_be_used: "To Be Used",
    empty:        "Empty",
    gave_away:    "Gave Away",
}

export const productOptions: Record<ProductCategory, string> = {
    body_lotion: "Body lotion",
    body_oil: "Body oil",
    body_shampoo: "Body shampoo",
    body_scrub: "Body scrub",
    eye_cream: "Eye Cream",
    facial_cream: "Facial Cream",
    face_mask: "Face mask",
    facial_serum: "Facial serum",
    facial_wash: "Facial wash",
    hand_soap: "Hand soap",
    toner: "Toner",
    hair_shampoo: "Hair shampoo",
    hair_conditioner: "Hair conditioner",
    hair_oil: "Hair oil",
    hair_treatment: "Hair treatment",
    handcream: "Hand cream",
    mouth_wash: "Mouth wash",
    sun_screen: "Sunscreen",
    tooth_paste: "Toothpaste",
    dental_floss: "Dental floss",
    toilet_paper: "Toilet paper",
    foot_care: "Foot care",
};


export const usageConditionStyle : Record<UsageCondition, string> = {
    using: "bg-lime-200 text-lime-700",
    to_be_used: "bg-yellow-200 text-yellow-700",
    empty: "bg-red-200 text-red-700",
    gave_away: "bg-olive-200 text-olive-700",
}

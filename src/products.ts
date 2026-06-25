export type Product = {
    id: string;
    brand: string;
    product: string;
    volume: number;
    price: number;
    usageCondition: UsageCondition;
    productCategory: ProductCategory;
    dateBought: string;
    quantity: number;
    bestBefore: string;
    dateOpen: string;
    dateEmpty: string;
    periodAfterOpen: number;
    note: string;
};

export type UsageCondition =
    | "using"
    | "to_be_opened"
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

export const usageOptions = {
    using:        "Using",
    to_be_opened: "To Be Opened",
    empty:        "Empty",
    gave_away:    "Gave Away",
}

// export const productOptions: Record<ProductCategory, string> = {
//     body_lotion:      "Body Lotion",
//     body_oil:         "Body Oil",
//     body_shampoo:     "Body Shampoo",
//     body_scrub:       "Body Scrub",
//     eye_cream:        "Eye Cream",
//     facial_cream:     "Facial Cream",
//     face_mask:        "Face Mask",
//     facial_serum:     "Facial Serum",
//     facial_wash:      "Facial Wash",
//     hand_soap:        "Hand Soap",
//     toner:            "Toner",
//     hair_shampoo:     "Hair Shampoo",
//     hair_conditioner: "Hair Conditioner",
//     hair_oil:         "Hair Oil",
//     hair_treatment:   "Hair Treatment",
//     handcream:        "Hand cream",
//     mouth_wash:       "Mouth Wash",
//     sun_screen:       "Sunscreen",
//     tooth_paste:      "Toothpaste",
//     dental_floss:     "Dental Floss",
//     toilet_paper:     "Toilet paper",
//     foot_care:        "Footcare",
// }

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
    hair_shampoo: "Hand shampoo",
    hair_conditioner: "Hair conditioner",
    hair_oil: "Hand oil",
    hair_treatment: "Hand treatment",
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
    to_be_opened: "bg-yellow-200 text-yellow-700",
    empty: "bg-red-200 text-red-700",
    gave_away: "bg-olive-200 text-olive-700",
}

export function handleClick() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

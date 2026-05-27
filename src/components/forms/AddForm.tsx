import React, { useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

/* ---------------- TYPES ---------------- */

type UsageCondition =
    | "using"
    | "to_be_opened"
    | "empty"
    | "gave_away";

type ProductCategory =
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

type Product = {
    id: string;
    brand: string;
    product: string;
    volume: number;
    price: number;
    usageCondition: UsageCondition;
    productCategory: ProductCategory;
    dateBought: string;
    bestBefore: string;
    dateOpen: string;
    dateEmpty: string;
    periodAfterOpen: string;
    note: string;
    picture: File | null;
};

export default function AddForm() {
    /* ---------------- STATE ---------------- */

    const [product, setProduct] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [volume, setVolume] = useState<string>("");
    const [usageCondition, setUsageCondition] =
        useState<UsageCondition>("using");

    const [productCategory, setProductCategory] =
        useState<ProductCategory>("body_lotion");

    const [dateBought, setDateBought] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [bestBefore, setBestBefore] = useState<string>("");
    const [dateOpen, setDateOpen] = useState<string>("");
    const [dateEmpty, setDateEmpty] = useState<string>("");

    const [periodAfterOpen, setPeriodAfterOpen] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [picture, setPicture] = useState<File | null>(null);

    const isUsing = usageCondition === "using";
    const isToBeOpened = usageCondition === "to_be_opened";
    const isGaveAway = usageCondition === "gave_away";

    /* ---------------- HANDLERS ---------------- */

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newProduct: Product = {
            id: crypto.randomUUID(),
            brand,
            product,
            volume: Number(volume),
            usageCondition,
            productCategory,
            dateBought,
            price: Number(price),
            bestBefore,
            dateOpen,
            dateEmpty,
            periodAfterOpen,
            note,
            picture,
        };

        const existing: Product[] = JSON.parse(
            localStorage.getItem("products") || "[]"
        );

        existing.push(newProduct);

        localStorage.setItem("products", JSON.stringify(existing));

        handleClear();
    }

    function handleClear() {
        setProduct("");
        setBrand("");
        setVolume("");
        setUsageCondition("using");
        setProductCategory("body_lotion");
        setDateBought("");
        setPrice("");
        setBestBefore("");
        setDateOpen("");
        setDateEmpty("");
        setPeriodAfterOpen("");
        setNote("");
        setPicture(null);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    /* ---------------- UI ---------------- */

    return (
        <div className="py-20 flex flex-col gap-10 px-2 md:py-20">
            <h1 className="text-center text-4xl font-bold leading-tight">
                Add a product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-md rounded-lg flex flex-col p-8"
            >
                {/* BRAND */}
                <label>Brand*</label>
                <input
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* PRODUCT */}
                <label>Product Name*</label>
                <input
                    required
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* USAGE */}
                <label>Usage Condition*</label>
                <select
                    value={usageCondition}
                    onChange={(e) =>
                        setUsageCondition(e.target.value as UsageCondition)
                    }
                    className="mb-8 border rounded-full p-5"
                >
                    <option value="using">Using</option>
                    <option value="to_be_opened">To be opened</option>
                    <option value="empty">Empty</option>
                    <option value="gave_away">Gave away</option>
                </select>

                {/* CATEGORY */}
                <label>Product Category*</label>
                <select
                    value={productCategory}
                    onChange={(e) =>
                        setProductCategory(e.target.value as ProductCategory)
                    }
                    className="mb-8 border rounded-full p-5"
                >
                    <option value="body_lotion">Body lotion</option>
                    <option value="body_oil">Body oil</option>
                    <option value="body_shampoo">Body shampoo</option>
                    <option value="body_scrub">Body scrub</option>
                    <option value="eye_cream">Eye cream</option>
                    <option value="facial_cream">Facial cream</option>
                    <option value="face_mask">Face mask</option>
                    <option value="facial_serum">Facial serum</option>
                    <option value="facial_wash">Facial wash</option>
                    <option value="hand_soap">Hand soap</option>
                    <option value="toner">Toner</option>
                    <option value="hair_shampoo">Hair shampoo</option>
                    <option value="hair_conditioner">Hair conditioner</option>
                    <option value="hair_oil">Hair oil</option>
                    <option value="hair_treatment">Hair treatment</option>
                    <option value="handcream">Hand cream</option>
                    <option value="mouth_wash">Mouth wash</option>
                    <option value="sun_screen">Sunscreen</option>
                    <option value="tooth_paste">Toothpaste</option>
                    <option value="dental_floss">Dental floss</option>
                    <option value="toilet_paper">Toilet paper</option>
                    <option value="foot_care">Foot care</option>
                </select>

                {/* VOLUME */}
                <label>Volume (ml)</label>
                <input
                    required
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* PRICE */}
                <label>Price</label>
                <input
                    required
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* DATES */}
                <label>Bought On</label>
                <input
                    required
                    type="date"
                    value={dateBought}
                    onChange={(e) => setDateBought(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                <label>Opened On</label>
                <input
                    type="date"
                    value={dateOpen}
                    onChange={(e) => setDateOpen(e.target.value)}
                    disabled={isToBeOpened}
                    className="mt-1 mb-8 w-full rounded-lg border p-4 disabled:opacity-50"
                />

                <label>Finished On</label>
                <input
                    type="date"
                    value={dateEmpty}
                    onChange={(e) => setDateEmpty(e.target.value)}
                    disabled={isUsing || isToBeOpened || isGaveAway}
                    className="mt-1 mb-8 w-full rounded-lg border p-4 disabled:opacity-50"
                />

                {/* BEST BEFORE */}
                <label>Best before</label>
                <input
                    type="date"
                    value={bestBefore}
                    onChange={(e) => setBestBefore(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* PERIOD */}
                <label className="flex items-center gap-2">
                    Period after opening <HiOutlineQuestionMarkCircle />
                </label>
                <input
                    value={periodAfterOpen}
                    onChange={(e) => setPeriodAfterOpen(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* NOTES */}
                <label>Notes</label>
                <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-1 mb-8 w-full rounded-lg border p-4"
                />

                {/* IMAGE */}
                <label>Picture</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setPicture(e.target.files?.[0] ?? null)
                    }
                    className="mt-1 mb-10 w-full rounded-lg border p-4"
                />

                {/* BUTTONS */}
                <button type="button" onClick={handleClear}>
                    Clear
                </button>

                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}
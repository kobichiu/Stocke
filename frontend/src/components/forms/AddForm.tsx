import {useEffect, useState} from "react";
import type {Product, ProductCategory, UsageCondition} from "../../products.ts";
import {usageOptions} from "../../products.ts";
import {productService} from "../../services/productService.ts";
import { AiOutlinePicture } from "react-icons/ai";


interface AddFormProps {
    onDirtyChange: (isDirty: boolean) => void;
    onCancel: () => void;
}

export default function AddForm({ onDirtyChange, onCancel }: AddFormProps) {

    const [imageError, setImageError] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [volume, setVolume] = useState<string>("");
    const [usageCondition, setUsageCondition] = useState<UsageCondition>("using");
    const [productCategory, setProductCategory] = useState<ProductCategory>("body_lotion");
    const [dateBought, setDateBought] = useState<string>("");
    const [opened, setOpened] = useState<boolean>(false);
    const [price, setPrice] = useState<string>("");
    const [dateExpire, setDateExpire] = useState<string>("");
    const [dateOpen, setDateOpen] = useState<string>("");
    const [dateEmpty, setDateEmpty] = useState<string>("");
    const [paoMonths, setPaoMonths] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const isUsing = usageCondition === "using";
    const isToBeUsed = usageCondition === "to_be_used";
    const isGaveAway = usageCondition === "gave_away";

    const isDirty = (
        product!=="" ||
        brand!=="" ||
        volume!=="" ||
        price!=="" ||
        dateExpire!=="" ||
        dateOpen!=="" ||
        dateEmpty!=="" ||
        paoMonths!=="" ||
        note!=="" ||
        image!==""
    );

    useEffect(() => {
        onDirtyChange(isDirty);
    }, [isDirty, onDirtyChange]);

    /* ---------------- HANDLERS ---------------- */

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newProduct: Product = {
            id: crypto.randomUUID(),
            dateAdded: new Date().toISOString(),
            brand,
            product,
            volume: Number(volume),
            usageCondition,
            productCategory,
            price: Number(price),
            isOpened: Boolean(opened),
            dateBought,
            dateExpire,
            dateOpen,
            dateEmpty,
            paoMonths: Number(paoMonths),
            note,
            image,
        };

        productService.add(newProduct);

        handleClear();
    }

    function handleClear() {
        setProduct("");
        setBrand("");
        setVolume("");
        setUsageCondition("using");
        setProductCategory("body_lotion");
        setOpened(false);
        setDateBought("");
        setPrice("");
        setDateExpire("");
        setDateOpen("");
        setDateEmpty("");
        setPaoMonths("");
        setNote("");
        setImage("");
        setImageError("");

        window.scrollTo({top: 0, behavior: "smooth"});
    }

    // This is a change event coming from an HTML <input> element.
    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file){
            setImageError("It is not working. Try again.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result as string);
        };

        reader.readAsDataURL(file);
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-sm mx-auto transition-all hover:shadow-md"
            >
                {/* Image at top*/}
                <div className="relative w-full h-96 overflow-hidden"
                >
                    <label
                        htmlFor="product-image"
                        style={{ backgroundImage: image ? `url(${image})` : undefined }}
                        className="h-96 w-full cursor-pointer rounded-2xl rounded-b-none border-2 border-dashed border-purple-300 bg-purple-50 bg-center bg-cover flex flex-col items-center justify-center gap-3 text-indigo-700 hover:bg-purple-100 transition"
                    >
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/30 px-6 py-5 text-center shadow-lg backdrop-blur-xl">
                            <AiOutlinePicture size={32} />
                            <span className="font-bold">Upload a picture of the product</span>
                            <span className="text-sm text-indigo-700">PNG, JPG, or JPEG</span>
                        </div>
                    </label>
                    <input
                        id="product-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    {imageError && (
                        <p className="text-sm text-red-500">
                            {imageError}
                        </p>
                    )}
                </div>

                {/* Form below */}
                <div className="my-8">
                    {/* Brand & Product Name: each on own line (phone), parallel on bigger screen */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Brand</label>
                            <input
                                required
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Product</label>
                            <input
                                required
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    <div className="p-2 md:p-4">
                        <label>Product Category</label>
                        <select
                            required
                            value={productCategory}
                            onChange={(e) =>
                                setProductCategory(e.target.value as ProductCategory)
                            }
                            className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-4 focus:outline-violet-300"
                        >
                            {/*can be simplified instead of listing out*/}
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
                    </div>

                    {/* Usage Condition BAR TO BE ADDED */}
                    <div className="flex flex-col p-2 md:p-4">
                        <label>Usage Condition</label>
                        <div
                            className="grid grid-cols-2 sm:grid-cols-4 bg-purple-100 gap-2 rounded-xl mt-1 p-2 justify-between text-center">
                            {Object.entries(usageOptions).map(([key, label]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setUsageCondition(key as UsageCondition)}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all focus:outline-violet-300 ${
                                        usageCondition === key
                                            ? "bg-purple-400 text-white shadow-md"
                                            : "text-gray-600 hover:bg-purple-50"
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Category stand alone */}

                    {/* Price & Volume */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Price</label>
                            <input
                                value={price}
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Volume (ml)</label>
                            <input
                                value={volume}
                                type="number"
                                onChange={(e) => setVolume(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Date: Bought On & Quantity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Is it opened?</label>
                            <select
                                value={opened ? "yes" : "no"}
                                onChange={(e) => setOpened(e.target.value === "yes")}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            >
                                <option value="no">Not opened</option>
                                <option value="yes">Opened</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label>Bought On</label>
                            <input
                                value={dateBought}
                                type="date"
                                onChange={(e) => setDateBought(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Date: Opened On & Empty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Opened On</label>
                            <input
                                value={dateOpen}
                                type="date"
                                disabled={isToBeUsed}
                                onChange={(e) => setDateOpen(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300 disabled:opacity-50"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Finished On</label>
                            <input
                                value={dateEmpty}
                                type="date"
                                disabled={isUsing || isToBeUsed || isGaveAway}
                                onChange={(e) => setDateEmpty(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Date: Expiry & Period After Opening (PAO) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Expiry</label>
                            <input
                                value={dateExpire}
                                type="date"
                                onChange={(e) => setDateExpire(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Period After Opening</label>
                            <input
                                value={paoMonths}
                                type="number"
                                onChange={(e) => setPaoMonths(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="p-2 md:p-4">
                        <label>Notes</label>
                        <input
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-4 focus:outline-violet-300"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row p-2 md:p-4 gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full sm:w-1/2 rounded-2xl p-3 bg-zinc-100 text-zinc-500 font-medium hover:bg-zinc-200 active:scale-95 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 rounded-2xl p-3 bg-purple-400 text-white font-bold hover:bg-purple-500 active:scale-95 transition-all"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </>
    )

}


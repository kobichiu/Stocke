import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {Product, ProductCategory, UsageCondition} from "../../products.ts";
import {usageOptions} from "../../products.ts";
import {productService} from "../../services/productService.ts";

interface EditFormProps {
    onDirtyChange: (isDirty: boolean) => void;
    onCancel: () => void;
}

export default function EditForm({ onDirtyChange, onCancel }: EditFormProps) {    const {id} = useParams();

    const navigate = useNavigate();

    // 13 fields for filling in
    const [product, setProduct] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [volume, setVolume] = useState<string>("");
    const [usageCondition, setUsageCondition] = useState<UsageCondition>("using");
    const [productCategory, setProductCategory] = useState<ProductCategory>("body_oil");
    const [dateBought, setDateBought] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [bestBefore, setBestBefore] = useState<string>("");
    const [dateOpen, setDateOpen] = useState<string>("");
    const [dateEmpty, setDateEmpty] = useState<string>("");
    const [periodAfterOpen, setPeriodAfterOpen] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const [originalProduct, setOriginalProduct] = useState<Product | null>(null);

    const isDirty =
        originalProduct !== null &&
        (
            product !== (originalProduct.product ?? "") ||
            brand !== (originalProduct.brand ?? "") ||
            usageCondition !== originalProduct.usageCondition ||
            productCategory !== originalProduct.productCategory ||
            volume !== String(originalProduct.volume ?? "") ||
            price !== String(originalProduct.price ?? "") ||
            quantity !== String(originalProduct.quantity ?? "") ||
            dateBought !== (originalProduct.dateBought ?? "") ||
            dateOpen !== (originalProduct.dateOpen ?? "") ||
            dateEmpty !== (originalProduct.dateEmpty ?? "") ||
            bestBefore !== (originalProduct.bestBefore ?? "") ||
            periodAfterOpen !== String(originalProduct.periodAfterOpen ?? "") ||
            note !== (originalProduct.note ?? "")
        );

    useEffect(() => {
        onDirtyChange(isDirty);
    }, [isDirty, onDirtyChange]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!id || !originalProduct) return;

        const updatedProduct: Product = {
            ...originalProduct,
            product,
            brand,
            usageCondition,
            productCategory,
            volume: Number(volume),
            price: Number(price),
            quantity: Number(quantity),
            dateBought,
            dateOpen,
            dateEmpty,
            bestBefore,
            periodAfterOpen: Number(periodAfterOpen),
            note,
        };

        productService.update(id, updatedProduct);

        navigate("/dashboard");
    };

    // useEffect (side effect) #1 - Load product data (original)
    useEffect(() => {

        if (!id) return;

        const prod = productService.getById(id);

        if (!prod) {
            setOriginalProduct(null);
            return;
        }
        setOriginalProduct(prod);

        if (!prod) return;

        setBrand(prod.brand);
        setProduct(prod.product);
        setUsageCondition(prod.usageCondition);
        setProductCategory(prod.productCategory);
        setVolume(String(prod.volume ?? ""));
        setPrice(String(prod.price ?? ""));
        setQuantity(String(prod.quantity ?? ""));
        setPeriodAfterOpen(String(prod.periodAfterOpen ?? ""));
        setDateBought(prod.dateBought ?? "");
        setDateOpen(prod.dateOpen ?? "");
        setDateEmpty(prod.dateEmpty ?? "");
        setBestBefore(prod.bestBefore ?? "");
        setNote(prod.note ?? "");
    }, [id]);

    return (
        <>
            <form
                onSubmit={handleUpdate}
                className="flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-sm mx-auto transition-all hover:shadow-md"
            >
                {/* Image at top*/}
                <div className="relative w-full h-64 overflow-hidden">
                    <img
                        src="/src/medicube.jpg"
                        alt="Product"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Form below */}
                <div className="my-4">
                    {/* Message shows when update is taken place, have to reset to false when users leave the page */}
                    {/*{showSuccessful && (*/}
                    {/*    <span className=" px-2 md:px-4 flex gap-1 text-lime-500 items-center justify-start">*/}
                    {/*        <IoMdCheckboxOutline />*/}
                    {/*        Successfully updated*/}
                    {/*    </span>*/}
                    {/*)}*/}
                    {/* Brand & Product Name: each on own line (phone), parallel on bigger screen */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Brand</label>
                            <input
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Product</label>
                            <input
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}

                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Usage Condition */}
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

                    <div className="p-2 md:p-4">
                        <label>Product Category</label>
                        <select
                            value={productCategory}
                            onChange={(e) =>
                                setProductCategory(e.target.value as ProductCategory)
                            }
                            className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-4 focus:outline-violet-300"
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
                    </div>

                    {/* Price & Volume */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Volume (ml)</label>
                            <input
                                type="number"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Date: Bought On & Quantity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Bought On</label>
                            <input
                                type="date"
                                value={dateBought}
                                onChange={(e) => setDateBought(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>Quantity</label>
                            <input
                                value={quantity}
                                type="number"
                                onChange={(e) => setQuantity(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Date: Opened On & Empty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Opened On</label>
                            <input
                                type="date"
                                value={dateOpen}
                                onChange={(e) => setDateOpen(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Finished On</label>
                            <input
                                type="date"
                                value={dateEmpty}
                                onChange={(e) => setDateEmpty(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>
                    </div>

                    {/* Date: Best before & Period After Opening (PAO) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-4 gap-3 md:gap-5">
                        <div className="flex flex-col">
                            <label>Best Before</label>
                            <input
                                type="date"
                                value={bestBefore}
                                onChange={(e) => setBestBefore(e.target.value)}
                                className="mt-1 mb-2 w-full rounded-lg bg-purple-100 p-2 focus:outline-violet-300"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Period After Opening (months)</label>
                            <input
                                type="number"
                                value={periodAfterOpen}
                                onChange={(e) => setPeriodAfterOpen(e.target.value)}
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
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

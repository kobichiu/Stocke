import { Link } from "react-router-dom";
import NavbarAfterLogIn from "../components/layout/NavbarAfterLogIn.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { BsBeaker } from "react-icons/bs";

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
    usageCondition: UsageCondition;
    productCategory: ProductCategory;
    volume: number;
    price: number;
    image?: string;
};

export default function DashboardPage() {
    const [selectedTag, setSelectedTag] = useState<UsageCondition | null>(null);

    /* ---------------- DATA ---------------- */

    const products: Product[] = JSON.parse(
        localStorage.getItem("products") || "[]"
    );

    const filterProducts = selectedTag
        ? products.filter((product) => product.usageCondition === selectedTag)
        : products;

    const uniqueUsedCategory = Array.from(
        new Set(products.map((item) => item.productCategory))
    ) as ProductCategory[];

    const uniqueUsedUsageCondition = Array.from(
        new Set(products.map((item) => item.usageCondition))
    ) as UsageCondition[];

    /* ---------------- LABELS ---------------- */

    const usageConditionLabels: Record<UsageCondition, string> = {
        using: "Using",
        to_be_opened: "To Be Opened",
        empty: "Empty",
        gave_away: "Gave Away",
    };

    const productCategoryLabels: Record<ProductCategory, string> = {
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

    /* ---------------- UI ---------------- */

    return (
        <div className="bg-[#f3eeff]">
            <NavbarAfterLogIn />

            <main className="min-h-screen px-6 md:px-8 py-8 w-full mx-auto max-w-6xl">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10">
                    <div className="flex flex-col">
                        <span>Hello, [username]</span>
                        <h1 className="text-4xl font-extrabold text-[#1E1A23]">
                            Your current inventory
                        </h1>
                        <span>
              {products.length} products across {uniqueUsedCategory.length} categories
            </span>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            to="/add"
                            className="px-5 py-2 bg-purple-400 text-white rounded-full font-bold flex items-center gap-2"
                        >
                            <FiFilter />
                            Filter
                        </Link>

                        <Link
                            to="/add"
                            className="px-5 py-2 bg-purple-400 text-white rounded-full font-bold"
                        >
                            + Quick Add
                        </Link>
                    </div>
                </div>

                {/* FILTERS */}
                <section className="flex flex-nowrap gap-4 overflow-x-auto py-4">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-5 py-2 rounded-full font-bold transition ${
                            selectedTag === null
                                ? "bg-purple-400 text-white"
                                : "bg-white/40"
                        }`}
                    >
                        All Items
                    </button>

                    {uniqueUsedUsageCondition.map((item) => (
                        <button
                            key={item}
                            onClick={() => setSelectedTag(item)}
                            className={`px-5 py-2 rounded-full font-bold transition ${
                                selectedTag === item
                                    ? "bg-purple-400 text-white"
                                    : "bg-white/40"
                            }`}
                        >
                            {usageConditionLabels[item]}
                        </button>
                    ))}
                </section>

                <hr className="border-[#C8C4DB]" />

                {/* GRID */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
                    {filterProducts.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative">
                                <img
                                    className="rounded-2xl w-full aspect-square object-cover"
                                    src={item.image || "/src/temp_placeholder.webp"}
                                />

                                <span className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {usageConditionLabels[item.usageCondition]}
                </span>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-[10px] uppercase font-bold text-[#6b5a83]">
                                    {item.brand}
                                </h2>

                                <h3 className="text-lg font-extrabold text-[#1E1A23]">
                                    {item.product}
                                </h3>

                                <span>{productCategoryLabels[item.productCategory]}</span>

                                <p className="flex items-center gap-1 mt-2">
                                    <BsBeaker />
                                    {item.volume} ml
                                </p>

                                <p className="flex items-center gap-1 mt-1">
                                    <IoPricetagsOutline />
                                    {item.price} €
                                </p>

                                <hr className="border-[#C8C4DB] my-4" />

                                <div className="flex justify-end gap-4">
                                    <button>
                                        <MdOutlineModeEdit size={24} />
                                    </button>
                                    <button>
                                        <AiOutlineDelete size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* ADD CARD */}
                    <div className="flex flex-col rounded-2xl p-6 border-2 border-dashed border-[#CFC4D9] items-center justify-center min-h-[420px] gap-2">
                        <Link
                            to="/add"
                            className="rounded-full bg-white text-[#CFC4D9] w-12 h-12 shadow-md flex items-center justify-center text-2xl hover:scale-110 transition"
                        >
                            +
                        </Link>

                        <span className="text-xl text-indigo-950">New product</span>
                        <span className="text-center text-sm text-gray-600">
              Scan or add manually
              <br />
              to your existing list
            </span>
                    </div>
                </section>
            </main>

            <BottomNavBar />
        </div>
    );
}
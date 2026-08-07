import {Link, useNavigate} from "react-router-dom";
import NavbarAfterLogIn from "../components/layout/NavbarAfterLogIn.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import {useState} from "react";
import {AiOutlineDelete} from "react-icons/ai";
import {MdExpandMore, MdOutlineModeEdit} from "react-icons/md";
import {IoPricetagsOutline} from "react-icons/io5";
import {BsBeaker} from "react-icons/bs";
import {BiPlus} from "react-icons/bi";
import type {Product, ProductCategory, UsageCondition, ExpiryFilters, SortBy} from "../products.ts";
import {productOptions, usageConditionStyle, usageOptions} from "../products.ts";
import {productService} from "../services/productService.ts";
import {filterProducts, uniqueRecordedProductCategory, uniqueRecordedUsageCondition, sortedFilteredProduct} from "../dashboardFilter.ts";
import placeholder from "../placeholder.png";

export default function DashboardPage() {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState<UsageCondition | ProductCategory | ExpiryFilters | null>(null);
    const [selectedSortBy, setSelectedSortBy] = useState<SortBy | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    /* ---------------- DATA ---------------- */

    const products: Product[] = productService.getAll();

    const filteredProducts = filterProducts(products, selectedFilter);
    const sortedFilteredProd = sortedFilteredProduct(filteredProducts, selectedSortBy);

    const categories = uniqueRecordedProductCategory(products);
    const usageConditions = uniqueRecordedUsageCondition(products);
    const expiringButton = [
        { label: "Expiring in 3 months", months: 3 },
        { label: "Expiring in 6 months", months: 6 },
        { label: "Expiring in 12 months", months: 12 },
    ] as const;

    const combinedTags = [
        ...categories.map((item) => ({
            type: "category" as const,
            value: item,
            label: productOptions[item],
        })),
        ...usageConditions.map((item) => ({
            type: "usage" as const,
            value: item,
            label: usageOptions[item],
        })),
        ...expiringButton.map((item) => ({
            type: "expiry" as const,
            value: item.months,
            label: item.label,
        })), {
            type: "expiry" as const,
            value: "expired" as const,
            label: "Expired",
        },
    ];

    function deleteProduct(id: string) {
        productService.delete(id);
        setShowModal(false);
        setDeleteTargetId(null);
        navigate("/dashboard");
    }

    const listToDisplay = selectedSortBy !== null ? sortedFilteredProd : filteredProducts;

    /* ---------------- UI ---------------- */

    return (
        <div className="bg-[#f3eeff] min-h-screen ">
            <NavbarAfterLogIn/>

            <main className="pt-20 px-6 md:px-8 py-8 w-full h-screen mx-auto max-w-6xl">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10">
                    <div className="flex flex-col relative gap-2">
                        <span>Hello, [username]</span>
                        <h1 className="text-4xl font-extrabold text-[#1E1A23]">
                            Your current inventory
                        </h1>
                        <span>
                            {/* plural/single handling NEED TO BE CORRECTED, CATER FOR QUANTITY*/}
                            {products.length} {products.length > 1 ? "products " : "product "}
                            across {categories.length} {categories.length > 1 ? "categories" : "category"}
                        </span>
                    </div>

                    <div className="flex gap-2 my-4">
                        {/*<button*/}
                        {/*    className="px-5 py-2 bg-transparent border border-purple-900 text-purple-900 rounded-full font-bold flex items-center gap-2 transition-all hover:border-transparent hover:bg-purple-400 hover:text-white outline-none focus:outline-none"*/}
                        {/*>*/}
                        {/*    <FiFilter/>*/}
                        {/*    <span className="font-bold">Filter</span>*/}
                        {/*</button>*/}

                        <Link
                            to="/add"
                            className="px-5 py-2 bg-transparent border border-purple-900 text-purple-900 rounded-full font-bold flex items-center gap-2 transition-all hover:border-transparent hover:bg-purple-400 hover:text-white outline-none focus:outline-none"
                        >
                            <BiPlus/>
                            Quick Add
                        </Link>
                    </div>
                </div>

                {/* FILTERS */}
                <section className="flex flex-nowrap gap-4 overflow-x-auto py-4 scrollbar-thumb-purple-300 scrollbar-track-transparent">
                    <p>Filters</p>
                    <button
                        onClick={() => setSelectedFilter(null)}
                        className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                            selectedFilter === null
                                ? "bg-purple-400 text-white"
                                : "bg-white/40"
                        }`}
                    >
                        All Items
                    </button>

                    {combinedTags.map((item) => (
                        <button
                            key={`${item.type}-${item.value}`}
                            onClick={() => setSelectedFilter(item.value)}
                            className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                                selectedFilter === item.value
                                    ? "bg-purple-400 text-white"
                                    : "bg-white/40"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </section>

                {/* SORT BY*/}
                <section className="flex flex-nowrap gap-4 overflow-x-auto py-4 scrollbar-thumb-purple-300 scrollbar-track-transparent">
                    <p className="whitespace-nowrap underline">Sort By</p>
                    <button
                        onClick={() => setSelectedSortBy("added_new_to_old")}
                        className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                            selectedSortBy === "added_new_to_old"
                                ? "bg-purple-400 text-white"
                                : "bg-white/40"
                        }`}
                    >
                        Added newest to oldest
                    </button>
                    <button
                        onClick={() => setSelectedSortBy("added_old_to_new")}
                        className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                            selectedSortBy === "added_old_to_new"
                                ? "bg-purple-400 text-white"
                                : "bg-white/40"
                        }`}
                    >
                        Added oldest to newest
                    </button>
                    <button
                        onClick={() => setSelectedSortBy("price_high_to_low")}
                        className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                            selectedSortBy === "price_high_to_low"
                                ? "bg-purple-400 text-white"
                                : "bg-white/40"
                        }`}
                    >
                        Price highest to lowest
                    </button>
                    <button
                        onClick={() => setSelectedSortBy("price_low_to_high")}
                        className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                            selectedSortBy === "price_low_to_high"
                                ? "bg-purple-400 text-white"
                                : "bg-white/40"
                        }`}
                    >
                        Price lowest to highest
                    </button>
                </section>

                <hr className="border-[#C8C4DB] mt-2"/>

                {/* GRID */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
                    {listToDisplay.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative">
                                {item.image && (
                                    <img
                                    className="rounded-2xl w-full aspect-square object-cover"
                                    src={item.image}
                                    alt={item.product}
                                />)}
                                {!item.image && (
                                    <img
                                        className="rounded-2xl w-full aspect-square object-cover"
                                        src={placeholder}
                                        alt={item.product}
                                    />
                                )}
                                <span
                                    className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm ${usageConditionStyle[item.usageCondition]}`}>
                                    {usageOptions[item.usageCondition]}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-[10px] uppercase font-bold text-[#6b5a83]">
                                    {item.brand}
                                </h2>

                                <h3 className="text-lg font-extrabold text-[#1E1A23]">
                                    {item.product}
                                </h3>

                                <span>{productOptions[item.productCategory]}</span>

                                <p className="flex items-center gap-1 mt-2">
                                    <BsBeaker/>
                                    {item.volume} ml
                                </p>

                                <p className="flex items-center gap-1 mt-1">
                                    <IoPricetagsOutline/>
                                    {item.price} €
                                </p>

                                <hr className="border-[#C8C4DB] my-4"/>

                                <div className="flex justify-between gap-auto">
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="group flex flex-row items-center gap-1 p-2 pl-0 rounded-lg transition-all duration-300 ease-out whitespace-nowrap hover:scale-105"
                                    >
                                        More details
                                        <MdExpandMore size={24}/>
                                    </Link>

                                    <div className="flex items-center gap-1">
                                        <Link
                                            to={`/edit/${item.id}`}
                                            className="p-2 rounded-lg hover:text-purple-500 hover:bg-purple-100 transition-all duration-300 ease-out cursor-pointer"
                                        >
                                            <MdOutlineModeEdit size={24}/>
                                        </Link>
                                        <button
                                            id={item.id}
                                            className="p-2 rounded-lg hover:text-rose-400 hover:bg-rose-100 transition-all duration-300 ease-out cursor-pointer"
                                            onClick={() => {
                                                setShowModal(true)
                                                setDeleteTargetId(item.id)
                                            }}
                                        >
                                            <AiOutlineDelete size={24}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* ADD CARD */}
                    <div
                        className="flex flex-col rounded-2xl p-6 border-2 border-dashed border-[#CFC4D9] items-center justify-center min-h-[420px] gap-2">
                        <Link
                            to="/add"
                            className="rounded-full bg-white text-[#CFC4D9] w-12 h-12 shadow-md flex items-center justify-center text-2xl hover:scale-110 transition"
                        >
                            +
                        </Link>

                        <span className="text-xl text-indigo-950">New product</span>
                        <span className="text-center text-sm text-gray-600">
                            Scan or add manually
                            <br/>
                            to your existing list
                        </span>
                    </div>
                </section>
            </main>
            <BottomNavBar/>
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
                    <div className="bg-white w-full sm:w-auto rounded-t-2xl sm:rounded-2xl p-6 flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-[#1E1A23]">Delete this product?</h2>
                        <p className="text-sm text-gray-500">Your change will be not recovered.</p>

                        <div className="flex flex-col gap-3">
                            <button
                                className="w-full py-3 rounded-2xl bg-zinc-100 text-zinc-500 font-medium hover:bg-zinc-200 active:scale-95 transition-all"
                                onClick={() => {
                                    setShowModal(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-full py-3 rounded-2xl bg-red-400 text-white font-bold hover:bg-red-500 active:scale-95 transition-all"
                                onClick={() => {
                                    if (!deleteTargetId) return;
                                    deleteProduct(deleteTargetId);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

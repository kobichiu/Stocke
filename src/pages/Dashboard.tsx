import {Link} from "react-router-dom";
import NavbarAfterLogIn from "../components/layout/NavbarAfterLogIn.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import {useState} from "react";
import {FiFilter} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineModeEdit} from "react-icons/md";
import {IoPricetagsOutline} from "react-icons/io5";
import {BsBeaker} from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import type {Product, UsageCondition, ProductCategory} from "../products.ts";
import {usageConditionStyle} from "../products.ts";
import {usageOptions, productOptions} from "../products.ts";

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

    /* ---------------- UI ---------------- */

    return (
        <div className="bg-[#f3eeff] min-h-screen ">
            <NavbarAfterLogIn/>

            <main className="pt-20 px-6 md:px-8 py-8 w-full mx-auto max-w-6xl">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10">
                    <div className="flex flex-col relative gap-2">
                        <span>Hello, [username]</span>
                        <h1 className="text-4xl font-extrabold text-[#1E1A23]">
                            Your current inventory
                        </h1>
                        <span>
                            {/*plural/single handling*/}
                            {products.length} {products.length > 1 ? "products " : "product "}
                            across {uniqueUsedCategory.length} {uniqueUsedCategory.length > 1 ? "categories" : "category"}
                        </span>
                    </div>

                    <div className="flex gap-2 my-4">
                        <button
                            className="px-5 py-2 bg-transparent border border-purple-900 text-purple-900 rounded-full font-bold flex items-center gap-2 transition-all hover:border-transparent hover:bg-purple-400 hover:text-white outline-none focus:outline-none"
                        >
                            <FiFilter/>
                            Filter
                        </button>

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
                <section className="flex flex-nowrap gap-4 overflow-x-auto py-4">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
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
                            className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full font-bold transition outline-none focus:outline-none ${
                                selectedTag === item
                                    ? "bg-purple-400 text-white"
                                    : "bg-white/40"
                            }`}
                        >
                            {usageOptions[item]}
                        </button>
                    ))}
                </section>

                <hr className="border-[#C8C4DB]"/>

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
                                    src="/src/medicube.jpg"
                                />
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
                                        <MdExpandMore size={24} />
                                    </Link>

                                    <div className="flex items-center gap-1">
                                        <Link
                                            to={`/edit/${item.id}`}
                                            className="p-2 rounded-lg hover:text-purple-500 hover:bg-purple-100 transition-all duration-300 ease-out cursor-pointer"
                                        >
                                            <MdOutlineModeEdit size={24}/>
                                        </Link>
                                        <button
                                            className="p-2 rounded-lg hover:text-rose-400 hover:bg-rose-100 transition-all duration-300 ease-out cursor-pointer"
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
        </div>
    );
}
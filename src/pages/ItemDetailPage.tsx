import {Link, useParams} from "react-router-dom";
import NavbarWithArrow from "../components/layout/NavbarWithArrow.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import type {Product} from "../products.ts";
import { IoPricetagsOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineModeEdit} from "react-icons/md";
import {BsBeaker} from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";


import {usageOptions, usageConditionStyle, productOptions} from "../products.ts";

export default function ItemDetailPage() {
    const {id} = useParams();

    const products : Product[] = JSON.parse(localStorage.getItem("products") || "[]");

    const product : Product | undefined = products.find((item: Product) => item.id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="bg-[#f3eeff] min-h-screen ">
            <NavbarWithArrow/>
            <main className="pt-20 px-6 md:px-8 py-8 w-full mx-auto max-w-6xl">
                <h2 className="text-center text-4xl font-extrabold text-[#1E1A23]">
                    Item Details
                </h2>
                <h3 className="text-center text-xl font-light text-[#1E1A23]">
                    (to be available)
                </h3>
                <div className="pt-10 w-full">
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <img
                            src="/src/medicube.jpg"
                            className="w-full h-80 object-cover"
                        />

                        <div className="p-6 my-2">
                            <div className="flex justify-between items-center">
                                {/* Brand */}
                                <span className="text-sm md:text-md uppercase text-[#7F76DD] font-bold">
                                    {product.brand}
                                </span>

                                {/* Tag of Usage Condition: using/to be opened/empty/gave away */}
                                <span className={`inline-block px-3 py-1  rounded-full text-sm ${usageConditionStyle[product.usageCondition]}`}>
                                    {usageOptions[product.usageCondition]}
                                </span>
                            </div>
                            {/* Product Name */}
                            <h1 className="text-3xl font-extrabold text-[#1E1A23] my-2">
                                {product.product}
                            </h1>

                            <div className="flex justify-start items-center gap-3 my-2">
                                {/* Category of Product */}
                                <span className="inline-flex items-center px-3 py-1 bg-[#F3EEFF] text-[#6A5A83] border border-[#DACFF0] rounded-full text-sm gap-2">
                                    <LiaShoppingBagSolid /> {productOptions[product.productCategory]}
                                </span>
                                {/* Price */}
                                <span className="inline-flex items-center px-3 py-1 bg-[#F3EEFF] text-[#6A5A83] border border-[#DACFF0] rounded-full text-sm gap-2">
                                    <IoPricetagsOutline /> {product.price}
                                </span>
                                {/* Volume*/}
                                <span className="inline-flex items-center px-3 py-1 bg-[#F3EEFF] text-[#6A5A83] border border-[#DACFF0] rounded-full text-sm gap-2">
                                    <BsBeaker /> {product.volume} ml
                                </span>
                                {/* Quantity */}
                                <span className="inline-flex items-center px-3 py-1 bg-[#F3EEFF] text-[#6A5A83] border border-[#DACFF0] rounded-full text-sm gap-2">
                                    <AiOutlineNumber />{product.quantity}
                                </span>
                            </div>

                            <hr className="my-4 text-[#DACFF0]"/>

                            <div className="grid grid-cols-2 overflow-hidden mb-4">
                                {/* MERGED TOP CELL */}
                                <div className="col-span-2 p-3 border-b border-purple-200">
                                    <p className="text-sm text-[#9E8FB5] font-normal uppercase">Bought On</p>
                                    <p className="text-olive-600">{product.dateBought || "-"}</p>
                                </div>

                                {/* Row 1 */}
                                <div className="border-r border-b border-purple-200 p-3">
                                    <p className="text-sm text-[#9E8FB5] font-normal uppercase">Opened On</p>
                                    <p className="text-olive-600">{product.dateOpen || "-"}</p>
                                </div>

                                <div className="border-b border-purple-200 p-3">
                                    <p className="text-sm text-[#9E8FB5] font-normal uppercase">Finished On</p>
                                    <p className="text-olive-600">{product.dateEmpty || "-"}</p>
                                </div>

                                {/* Row 2 */}
                                <div className="border-r border-purple-200 p-3">
                                    <p className="text-sm text-[#9E8FB5] font-normal uppercase">Best Before</p>
                                    <p className="text-olive-600">{product.bestBefore || "-"}</p>
                                </div>

                                <div className="p-3">
                                    <p className="text-sm text-[#9E8FB5] font-normal uppercase">Period After Opening</p>
                                    <p className="text-olive-600">
                                        {product.periodAfterOpen
                                            ? `${product.periodAfterOpen} months`
                                            : "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="my-4 w-full p-3 bg-purple-200/50 rounded-xl">
                                <p className="text-sm text-[#9e8fb5] font-normal uppercase">Notes</p>
                                <p className="text-olive-600">{product.note || "-"}</p>
                            </div>
                            <div className="flex justify-between items-center my-4 w-full gap-3">
                                <Link
                                    to={`/edit/${product.id}`}
                                    className="group flex flex-row p-4 items-center justify-center w-1/2 bg-indigo-400 text-white rounded-lg gap-1"
                                >
                                    <MdOutlineModeEdit size={24}/> Edit
                                </Link>
                                <button
                                    className="group flex flex-row p-4 items-center justify-center w-1/2 bg-rose-400 text-white rounded-lg gap-1"
                                >
                                    <AiOutlineDelete size={24}/> Delete
                                </button>
                            </div>





                            {/*<span>Note: {product.note}</span>*/}
                        </div>
                    </div>
                </div>
            </main>
            <BottomNavBar/>
        </div>
    );
}
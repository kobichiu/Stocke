import Navbar from "../components/layout/Navbar.tsx";
import {motion} from "framer-motion";
import lotion from "../../main_graphic/lotion.svg";
import serum from "../../main_graphic/serum.svg";
import cream from "../../main_graphic/cream.svg";
import bubble from "../../main_graphic/bubble.svg";
import handwash from "../../main_graphic/handwash.svg";
import handcream from "../../main_graphic/handcream.svg";
import { IoArrowForwardSharp } from "react-icons/io5";
import { ImQuotesLeft } from "react-icons/im";
import { RiDiscountPercentLine } from "react-icons/ri";
import { RiShoppingBagLine } from "react-icons/ri";
import { PiEyesFill } from "react-icons/pi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import placeholder from "../../main_graphic/placeholder.png";


export default function MainPage() {
    return (
        <>
            <div className="min-h-screen">
                <Navbar />
                <section className="w-full mx-auto">
                    <div className="relative bg-white h-[800px]">
                        <motion.img
                            src={lotion}
                            alt=""
                            className="absolute left-[15%] top-[16%] w-23 rotate-[-8deg] z-10"
                            animate={{y: [0, -18, 0], rotate: [-12, -8, -12]}}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.img
                            src={serum}
                            alt=""
                            className="absolute left-[42%] top-[5%] w-15 rotate-[10deg] z-10"
                            animate={{y: [0, 20, 0], rotate: [10, 15, 10]}}
                            transition={{
                                duration: 5.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.4,
                            }}
                        />
                        <motion.img
                            src={cream}
                            alt=""
                            className="absolute bottom-[15%] right-[20%] w-28 rotate-[-6deg] z-10"
                            animate={{y: [0, -14, 0], rotate: [-6, -2, -6]}}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.8,
                            }}
                        />
                        <motion.img
                            src={bubble}
                            alt=""
                            aria-hidden="true"
                            className="absolute right-[20%] top-[8%] w-18 rotate-[3deg] z-10"
                            animate={{y: [0, 14, 0], rotate: [8, 4, 8]}}
                            transition={{
                                duration: 5.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.2,
                            }}
                        />
                        <motion.img
                            src={handwash}
                            alt=""
                            aria-hidden="true"
                            className="absolute right-[40%] bottom-[18%] w-24 md:w-36 rotate-[2deg] z-10"
                            animate={{y: [0, -16, 0], rotate: [12, 17, 12]}}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.6,
                            }}
                        />
                        <motion.img
                            src={handcream}
                            alt=""
                            aria-hidden="true"
                            className="absolute left-[25%] bottom-[18%] w-40 rotate-[-40deg] z-10"
                            animate={{y: [0, -16, 0], rotate: [12, 17, 12]}}
                            transition={{
                                duration: 4.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.6,
                            }}
                        />
                        <div className="relative z-20 flex flex-col items-center justify-center h-full gap-10">
                            {/*<span className="mb-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#6b5a83]">*/}
                            {/*    Know what you have & Use what you love*/}
                            {/*</span>*/}

                            <h1 className="text-center max-w-4xl text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a161e]">
                                Stocking up piles of stuff?
                            </h1>
                            <h4 className="text-lg font-light tracking-[0.3em] text-[#6b5a83] text-center">
                                Free your home storage up with Stócke
                            </h4>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                                <button
                                    className="px-8 py-4 bg-purple-400 text-white font-semibold rounded-full shadow-lg shadow-[#6b5a83]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                                    Get Started <IoArrowForwardSharp />
                                </button>
                                <button
                                    className="px-8 py-4 bg-transparent backdrop-blur-md border border-[#e3d1eb] text-[#6b5a83] font-semibold rounded-full hover:bg-white/60 transition-all">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full h-auto mx-auto">
                    <div className="flex flex-col items-center justify-center gap-8 my-20 mx-auto">
                        <h2 className="text-center max-w-4xl text-4xl md:text-5xl font-extrabold tracking-tight text-[#1a161e]">
                            Does it sound familiar to you?
                        </h2>
                        <span className="text-center max-w-4xl text-4xl md:text-5xl font-extrabold tracking-tight text-purple-300"><ImQuotesLeft/></span>
                        <h3 className="italic text-2xl md:text-4xl font-normal text-center">"Hmm... I still have some at home...but it's on sale!"</h3>
                        <h4 className="text-2xl font-light">And this is how the stockpile grows.</h4>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5 my-20 mx-auto">
                        <div className="rounded-lg bg-white p-4 w-sm flex flex-col gap-6 shadow-md shadow-indigo-300/50">
                            <div className="border border-transparent bg-purple-200 w-fit rounded-full">
                                <PiEyesFill className="w-8 h-8 m-4 text-purple-900" />
                            </div>
                            <h4 className="text-sm font-normal uppercase tracking-tight text-gray-600">Out of sight, out of mind</h4>
                            <p className="text-lg font-light tracking-normal">Unused products tucked away in storage are easy to ignored</p>
                        </div>

                        <div className="rounded-lg bg-white p-4 w-sm flex flex-col gap-6 shadow-md shadow-indigo-400/50">
                            <div className="border border-transparent bg-purple-200 w-fit rounded-full">
                                <RiDiscountPercentLine className="w-8 h-8 m-4 text-purple-900" />
                            </div>
                            <h4 className="text-sm font-normal uppercase tracking-tight text-gray-600">A sale is a sale!</h4>
                            <p className="text-lg font-light tracking-normal">A good deal can trigger your FOMO so you may buy more</p>
                        </div>

                        <div className="rounded-lg bg-white p-4 w-sm flex flex-col gap-6 shadow-md shadow-indigo-300/50">
                            <div className="border border-transparent bg-purple-200 w-fit rounded-full">
                                <RiShoppingBagLine className="w-8 h-8 m-4 text-purple-900" />
                            </div>
                            <h4 className="text-sm font-normal uppercase tracking-tight text-gray-600">There's always something new</h4>
                            <p className="text-lg font-light tracking-normal">New launches keep catching your eye before you finish what you already have</p>
                        </div>
                    </div>
                </section>
                <section className="px-6 py-24 mx-auto">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
                        <div className="flex flex-col gap-8">
                            <p className="text-xl font-extralight uppercase tracking-tight text-[#6b5a83]">
                                Meet Stócke
                            </p>

                            <h2 className="mt-4 text-5xl font-extrabold text-[#1a161e]">
                                Your home inventory, all in one place
                            </h2>

                            <p className="mt-5 font-light text-xl text-[#6b5a83]">
                                Stócke helps you keep track of everyday essentials, use products before they
                                expire, and avoid buying what you already own.
                            </p>

                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center gap-2 text-md text-gray-700">
                                    <IoIosCheckmarkCircle className="h-6 w-6 shrink-0 text-purple-500" />
                                    Keep all your products in one place
                                </li>

                                <li className="flex items-center gap-2 text-md text-gray-700">
                                    <IoIosCheckmarkCircle className="h-6 w-6 shrink-0 text-purple-500" />
                                    See what needs to be used first
                                </li>

                                <li className="flex items-center gap-2 text-md text-gray-700">
                                    <IoIosCheckmarkCircle className="h-6 w-6 shrink-0 text-purple-500" />
                                    Avoid buying unnecessary duplicates
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-3xl bg-white p-4 shadow-lg">
                            {/* Dashboard screenshot or styled static dashboard preview */}
                            <img src={placeholder} alt={placeholder}/>
                        </div>
                    </div>
                </section>
                <section className="bg-white py-20 px-30 mx-auto">
                    <div className="bg-gradient-to-t from-white to-purple-100 shadow-md shadow-violet-50 p-10 h-96 rounded-4xl text-center flex flex-col items-center justify-center gap-6">
                            <h4 className="text-3xl md:text-4xl tracking-tight font-bold text-center text-gray-800">Make space for what matters</h4>
                            <span className="font-light italic">Start using Stócke to reclaim home storage and shop smarter.</span>
                            <button
                                className="px-8 py-4 bg-purple-400 text-white font-semibold rounded-full shadow-lg shadow-[#6b5a83]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                                Sign Up For Free <IoArrowForwardSharp />
                            </button>
                    </div>
                </section>



                <footer className="relative w-full bg-white font-light text-[#26113C]">
                    <div className="mx-auto flex max-w-6xl flex-row items-center justify-between px-4 py-4 md:px-8">
                        Stócke
                        <div className="flex flex-wrap justify-center items-center gap-6">
                            <p>Privacy Policy</p>
                            <p>Terms of Service</p>
                            <p>Contact</p>
                        </div>
                        <div>
                            © 2026 Stócke. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
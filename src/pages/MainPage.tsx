// pages here in /pages act as container that assemble smaller reusable components together
import Navbar from "../components/layout/Navbar.tsx";

export default function MainPage() {
    return (
        <>
            <body className="bg-[#f3eeff]">
            <Navbar/>
            {/*bg-gradient-to-br from-[#fafafa] via-[#f5f3ff] to-[#e2e8f0]*/}
            <section className="relative w-full h-screen flex flex-col px-6 py-20 items-center justify-center text-center">
                <span className="mb-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#6b5a83]">
                    Better Management
                </span>

                <h1 className="text-center max-w-4xl text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a161e] mb-12">
                    Stocking up piles of stuff?
                </h1>
                <div className="flex flex-wrap justify-center items-center gap-6">
                    <button
                        className="px-8 py-4 bg-purple-400 text-white font-semibold rounded-full shadow-lg shadow-[#6b5a83]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        XXX
                    </button>
                    <button
                        className="px-8 py-4 bg-transparent backdrop-blur-md border border-[#e3d1eb] text-[#6b5a83] font-semibold rounded-full hover:bg-white/60 transition-all">
                        Quick Filter
                    </button>
                </div>
            </section>

            <footer className="absolute w-full sticky bg-white font-light text-[#26113C]">
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
            </body>
        </>
    );
}
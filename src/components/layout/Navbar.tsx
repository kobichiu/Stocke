import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white sticky top-0">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between px-4 py-4 md:px-8">
                <div className="flex items-center justify-between text-[#26113C] font-bold text-xl">
                    Stócke
                </div>

                <div className="flex flex-row gap-3 md:gap-5">
                    <Link className="rounded-full px-3 py-2 text-purple-400 hover:bg-[#fafafa] md:px-4" to="/login">
                        Log In
                    </Link>

                    <Link className="rounded-full bg-purple-400 px-3 py-2 text-white hover:bg-[#ceb9fa] md:px-4" to="/signup">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
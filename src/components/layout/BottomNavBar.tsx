import { HiOutlineShoppingCart } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { TiHomeOutline } from "react-icons/ti";
import { NavLink } from "react-router-dom";

export default function BottomNavBar () {
    return (
        <div className="max-w-sm mx-auto sticky bottom-3">
            <div className="grid grid-cols-3 gap-3 p-2 sm:m-5 rounded-full
                        bg-white/20 backdrop-blur-xl
                        border border-black/30
                        shadow-lg">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${
                            isActive ? "text-purple-500" : "text-[#26113C]"
                        }`
                    }
                >
                    <TiHomeOutline />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${
                            isActive ? "text-purple-500" : "text-[#26113C]"
                        }`
                    }
                >
                    <HiOutlineShoppingCart />
                    <span>Shopping List</span>
                </NavLink>

                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 ${
                            isActive ? "text-purple-500" : "text-[#26113C]"
                        }`
                    }
                >
                    <CgProfile />
                    <span>Profile</span>
                </NavLink>

            </div>
        </div>
    );
}
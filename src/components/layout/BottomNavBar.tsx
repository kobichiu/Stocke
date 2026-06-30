import {HiOutlineShoppingCart} from "react-icons/hi2";
import {CgProfile} from "react-icons/cg";
import {TiHomeOutline} from "react-icons/ti";
import {useNavigate} from "react-router-dom";

interface BottomNavBarProps {
    onNavigate?: () => void;
}

export default function BottomNavBar({onNavigate}: BottomNavBarProps) {

    const navigate = useNavigate();

    const handleNavigate = (target: string) => {
        if (onNavigate) {
            onNavigate();
        } else {
            navigate(target);
        }
    }

    // check if the path of current url is equal to target then change color
    const isActive = (target: string) =>
        `flex flex-col items-center gap-1 ${
            location.pathname === target ? "text-purple-500" : "text-[#26113C]"
        }`;

    return (
        <div className="max-w-sm mx-auto sticky bottom-3">
            <div className="grid grid-cols-3 gap-3 p-2 sm:m-5 rounded-full bg-white/20 backdrop-blur-xl border border-black/20 shadow-lg">
                <button
                    type="button"
                    onClick={() => {handleNavigate("/dashboard")}}
                    className={isActive("/dashboard")}
                >
                    <TiHomeOutline/>
                    <span>Home</span>
                </button>

                <button
                    type="button"
                    onClick={() => {handleNavigate("/signup")}}
                    className={isActive("/signup")}
                >
                    <HiOutlineShoppingCart />
                    <span>Shopping List</span>
                </button>

                <button
                    type="button"
                    onClick={() => {handleNavigate("/profile")}}
                    className={isActive("/profile")}
                >
                    <CgProfile/>
                    <span>Profile</span>
                </button>

            </div>
        </div>
    );
}
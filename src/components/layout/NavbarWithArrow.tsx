import {useNavigate} from "react-router-dom";
import {FaArrowCircleLeft} from "react-icons/fa";

export default function NavbarWithArrow() {
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between px-4 py-3 md:px-8">
                <div className="flex gap-5 items-center justify-between text-[#26113C] font-bold text-xl">
                    <FaArrowCircleLeft
                        onClick={() => navigate(-1)}
                        className="cursor-pointer hover:text-[#cfbae6] transition"
                    />
                    Stócke
                </div>
            </div>
        </nav>
    );
}
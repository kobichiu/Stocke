import {FaArrowCircleLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

interface NavbarWithArrowProps {
    onBackClick?: () => void;
}

export default function NavbarWithArrow({onBackClick}: NavbarWithArrowProps) {
    const navigate = useNavigate();

    const handleNavigate = (target: string) => {
        if (onBackClick) {
            onBackClick();
        } else {
            navigate(target);
        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between px-4 py-3 md:px-8">
                <div className="flex gap-5 items-center justify-between text-[#26113C] font-bold text-xl">
                    <FaArrowCircleLeft
                        onClick={() => {handleNavigate("/dashboard")}}
                        className="cursor-pointer hover:text-[#cfbae6] transition"
                    />
                    Stócke
                </div>
            </div>
        </nav>
    );
}
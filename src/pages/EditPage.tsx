import EditForm from "../components/forms/EditForm.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import NavbarWithArrow from "../components/layout/NavbarWithArrow.tsx";
import {useState} from "react";

export default function EditPage() {
    const [onBackClick, setOnBackClick] = useState<(() => void) | null>(null);

    return (
        <div className="bg-[#f3eeff] min-h-screen">
            <NavbarWithArrow onBackClick={onBackClick} />
            <main className="pt-20 px-6 md:px-8 py-8 w-full mx-auto max-w-6xl">
                <h2 className="text-center text-4xl font-extrabold text-[#1E1A23]">
                    Edit item
                </h2>
                <h3 className="text-center text-xl font-light text-[#1E1A23]">
                    Update your item details
                </h3>
                <div className="py-10 w-full">
                    <EditForm setOnBackClick={setOnBackClick} />
                </div>
            </main>
            <BottomNavBar/>
        </div>
    )
}
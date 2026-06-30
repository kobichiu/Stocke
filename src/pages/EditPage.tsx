import EditForm from "../components/forms/EditForm.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import NavbarWithArrow from "../components/layout/NavbarWithArrow.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function EditPage() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const handleBackClick = () => {
        if (isDirty) {
            setShowModal(true);
        } else {
            navigate(-1);
        }
    }

    const discardChanges = () => {
        setShowModal(false);
        navigate("/dashboard");
    }

    const handleHomeClick = () => {
        if (isDirty) {
            setShowModal(true);
        } else {
            navigate("/dashboard");
        }
    }

    return (
        <div className="bg-[#f3eeff] min-h-screen">
            <NavbarWithArrow onBackClick={handleBackClick} />
            <main className="pt-20 px-6 md:px-8 py-8 w-full mx-auto max-w-6xl">
                <h2 className="text-center text-4xl font-extrabold text-[#1E1A23]">
                    Edit item
                </h2>
                <h3 className="text-center text-xl font-light text-[#1E1A23]">
                    Update your item details
                </h3>
                <div className="py-10 w-full">
                    <EditForm
                        onDirtyChange={setIsDirty}
                        onCancel={handleBackClick}
                    />
                </div>

                {/* dialog modal asking keep edit/discard */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
                        <div className="bg-white w-full sm:w-auto rounded-t-2xl sm:rounded-2xl p-6 flex flex-col gap-4">
                            <h2 className="text-lg font-bold text-[#1E1A23]">Discard changes?</h2>
                            <p className="text-sm text-gray-500">Your unsaved changes will not be saved.</p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 rounded-2xl bg-zinc-100 text-zinc-500 font-medium hover:bg-zinc-200 active:scale-95 transition-all"
                                >
                                    Keep Editing
                                </button>
                                <button
                                    onClick={discardChanges}
                                    className="w-full py-3 rounded-2xl bg-red-400 text-white font-bold hover:bg-red-500 active:scale-95 transition-all"
                                >
                                    Discard
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <BottomNavBar onNavigate={handleHomeClick} />
        </div>
    )
}
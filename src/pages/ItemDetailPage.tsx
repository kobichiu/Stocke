import NavbarWithArrow from "../components/layout/NavbarWithArrow.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";
import ItemDetailForm from "../components/forms/ItemDetailForm.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {productService} from "../services/productService.ts";

export default function ItemDetailPage() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

    function deleteProduct(id: string) {
        productService.delete(id);
        navigate("/dashboard");
    }

    return (
        <div className="bg-[#f3eeff] min-h-screen ">
            <NavbarWithArrow/>
            <ItemDetailForm
                onDelete = {(id) => {
                    setDeleteTargetId(id);
                    setShowModal(true);
                }}
            />
            <BottomNavBar />
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center">
                    <div className="bg-white w-full sm:w-auto rounded-t-2xl sm:rounded-2xl p-6 flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-[#1E1A23]">Discard changes?</h2>
                        <p className="text-sm text-gray-500">Your unsaved changes will not be saved.</p>

                        <div className="flex flex-col gap-3">
                            <button
                                className="w-full py-3 rounded-2xl bg-zinc-100 text-zinc-500 font-medium hover:bg-zinc-200 active:scale-95 transition-all"
                                onClick={() => {setShowModal(false)}}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-full py-3 rounded-2xl bg-red-400 text-white font-bold hover:bg-red-500 active:scale-95 transition-all"
                                onClick={() => {
                                    if (!deleteTargetId) return;
                                    deleteProduct(deleteTargetId);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
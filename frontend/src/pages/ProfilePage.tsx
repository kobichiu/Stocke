import NavbarAfterLogIn from "../components/layout/NavbarAfterLogIn.tsx";
import BottomNavBar from "../components/layout/BottomNavBar.tsx";

export default function ProfilePage() {
    return (
        <div className="bg-[#f3eeff] min-h-screen ">
            <NavbarAfterLogIn />
            <main className="pt-20 px-6 md:px-8 py-8 w-full mx-auto max-w-6xl">
            </main>
            <BottomNavBar />
        </div>
    )
}
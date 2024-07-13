import { Bell,  Folders, User2, Users } from "lucide-react";

const Navbar = () => {
    return ( 
        <nav className="fixed top-0 left-0 right-0 flex items-center justify-around p-4 border-b border-gray-300 backdrop-blur-sm bg-white bg-opacity-20 z-50 h-16">
            <div className="flex flex-row gap-4">
                <div>Icon</div>
                <p>/</p>
                <User2 />
                <div>Hamza Benarfa</div>
            </div>

            <div className="flex flex-row justify-center items-center gap-6">
                <div className="flex flex-row items-center justify-center gap-1">
                    <Folders />
                    <p>Projects</p>
                </div>
                <div className="flex flex-row items-center justify-center gap-1">
                    <Users />
                    <p>Teams</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-1">
                <Bell />
                <User2 />
            </div>
        </nav>
    );
}

export default Navbar;

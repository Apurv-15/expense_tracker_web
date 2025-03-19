import React, { useContext } from "react"; // Import useContext
import { SIDE_MENU_DATA } from "./utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext); // Access user context
    const navigate = useNavigate();
    
    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear local storage
        clearUser(); // Clear user context
        navigate("/login"); // Redirect to login
    };

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] shadow-lg">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.picture ? (
                    <img src={user?.picture} alt="profile" className="w-16 h-16 rounded-full mx-auto" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto"></div>
                )}
                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullname || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`} // Fixed the template literal syntax
                    className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-black bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-2xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
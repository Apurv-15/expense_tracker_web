import React, { useEffect, useState } from "react"; // Import useEffect and useState
import DashboardLayout from "./DashboardLayout"; // Ensure correct import path
// import { useUserAuth } from "./AuthLayout"; // Commented out custom hook for user authentication
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { addThousandSeparator } from './Helper'; // Commented out thousand separator import
import { IoMdCard } from 'react-icons/io'; // Example icon import
import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu'; // Example icon imports
// import axiosInstance from '../../api/axiosInstance'; // Commented out Axios import
// import { API_PATHS } from '../../constants/apiPaths'; // Commented out API paths import

const Home = () => {    
    // useUserAuth(); // Removed authentication logic

    const navigate = useNavigate(); // Initialize navigation
    const [dashboardData, setDashboard] = useState(null); // State to hold dashboard data
    const [loading, setLoading] = useState(false); // Loading state

    // Commenting out the fetchDashboard function for now
    /*
    const fetchDashboard = async () => {
        if (loading) return; // Prevent multiple requests
        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DASHBOARD}`);
            if (response.data) {
                setDashboard(response.data); // Set dashboard data from response
            }
        } catch (error) {
            console.log("Error fetching dashboard", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    useEffect(() => {
        fetchDashboard(); // Fetch dashboard data on component mount
        return () => {};
    }, []);
    */

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard
                    icon={<IoMdCard />}
                    label="Total Balance"
                    value={1000} // Hardcoded value for testing
                    color="bg-primary"
                />
                <InfoCard
                    icon={<LuWalletMinimal />}
                    label="Total Income"
                    value={500} // Hardcoded value for testing
                    color="bg-orange-500"
                />
                <InfoCard
                    icon={<LuHandCoins />}
                    label="Total Expense"
                    value={200} // Hardcoded value for testing
                    color="bg-red-500"
                />
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ExpenseTransactions
                    transactions={[]} // Empty array for testing
                    onSeeMore={() => navigate("/expense")}
                />
                {/* Additional components can be added here */}
            </div>
        </DashboardLayout>
    );
};

export default Home;
// import React, { useEffect, useState } from "react"; // Import useEffect and useState
// import DashboardLayout from "./DashboardLayout"; // Ensure correct import path
// import { useUserAuth } from "./AuthLayout"; // Import custom hook for user authentication
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { addThousandSeparator } from './Helper'; // Ensure this utility function exists
// import { IoMdCard } from 'react-icons/io'; // Example icon import
// import { LuWalletMinimal, LuHandCoins } from 'react-icons/lu'; // Example icon imports
// import axiosInstance from '../../api/axiosInstance'; // Ensure this is the correct path to your axios instance
// import { API_PATHS } from '../../constants/apiPaths'; // Ensure this is the correct path to your API paths

// const Home = () => {    
//     useUserAuth(); // Ensure user is authenticated

//     const navigate = useNavigate(); // Initialize navigation
//     const [dashboardData, setDashboard] = useState(null); // State to hold dashboard data
//     const [loading, setLoading] = useState(false); // Loading state

//     const fetchDashboard = async () => {
//         if (loading) return; // Prevent multiple requests
//         setLoading(true);

//         try {
//             const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DASHBOARD}`);
//             if (response.data) {
//                 setDashboard(response.data); // Set dashboard data from response
//             }
//         } catch (error) {
//             console.log("Error fetching dashboard", error);
//         } finally {
//             setLoading(false); // Reset loading state
//         }
//     };

//     useEffect(() => {
//         fetchDashboard(); // Fetch dashboard data on component mount
//         return () => {};
//     }, []);

//     return (
//         <DashboardLayout activeMenu="Dashboard">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <InfoCard
//                     icon={<IoMdCard />}
//                     label="Total Balance"
//                     value={addThousandSeparator(dashboardData?.totalBalance || 0)}
//                     color="bg-primary"
//                 />
//                 <InfoCard
//                     icon={<LuWalletMinimal />}
//                     label="Total Income"
//                     value={addThousandSeparator(dashboardData?.totalIncome || 0)}
//                     color="bg-orange-500"
//                 />
//                 <InfoCard
//                     icon={<LuHandCoins />}
//                     label="Total Expense"
//                     value={addThousandSeparator(dashboardData?.totalExpense || 0)}
//                     color="bg-red-500"
//                 />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <ExpenseTransactions
//                     transactions={dashboardData?.last30DaysExpenses || []}
//                     onSeeMore={() => navigate("/expense")}
//                 />
//                 {/* Additional components can be added here */}
//             </div>
//         </DashboardLayout>
//     );
// };

// export default Home;
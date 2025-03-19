import React from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
// Removed UserContext import

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {/* Removed user conditional rendering */}
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx=5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

// import React, { useContext } from 'react';
// import { UserContext } from "../../context/UserContext";
// const DashboardLayout = ({childern, activeMenu}) => {
//     const { user } = useContext(UserContext);
//   return (
//     <div className="">
//       <Navbar activeMenu={activeMenu} />
//       {user && (
//         <div className="flex">
//          <div className="max-[1080px]:hidden">
//            <SideMenu activeMenu={activeMenu} />
//         </div>
//         <div className="grow mx=5">{childern}</div>
//         </div>
//       )}
//     </div>
//   )
// }


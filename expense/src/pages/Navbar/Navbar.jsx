// import React, { useEffect, useState } from "react";
// import {
//   Nav,
//   NavLink,
//   Bars,
//   NavMenu,
//   NavBtn,
//   NavBtnLink,
// } from "./Navbar_element";
// import { useAuth0 } from "@auth0/auth0-react";
// import "./Navbar.css";

// const Navbar = () => {
//   const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
//   const [showNav, setShowNav] = useState(false);
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");

//   const toggleNav = () => {
//     setShowNav(!showNav);
//   };

//   useEffect(() => {
//     if (user) {
//       setEmail(user?.email);
//       setName(user?.name);
//     }
//   }, [user]);

//   // useEffect(() => {
//   //   if (email && name) {
//   //     sendUserData();
//   //   }
//   // }, [email, name]);

//   // const sendUserData = async () => {
//   //   const res = await fetch("http://localhost:5000/sendemail", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       email,
//   //       name,
//   //     }),
//   //   });
//   //   console.log(res);
//   // };

//   return (
//     <>
//       <Nav className="navbar">
//         <NavLink to="/" className="nav-logo">
//           <h1>KAHANIKARS</h1>
//         </NavLink>
//         <Bars onClick={toggleNav} />
//         <NavMenu showNav={showNav}>
//           <NavLink to="/work" className="nav-item">
//             Work
//           </NavLink>
//           <NavLink to="/policy" className="nav-item">
//             Policy
//           </NavLink>
//           <NavLink to="/collab" className="nav-item">
//             Need a Dev?
//           </NavLink>
//           {/* <NavLink to="/contact" className="nav-item">
//             Contact Us
//           </NavLink> */}
//           {/* <NavLink to="/faqs" className="nav-item">
//             FAQs
//           </NavLink> */}
//           {/* {isAuthenticated && (
//             <NavLink to="/myaccount" className="nav-item">
//               My Profile
//             </NavLink>
//           )} */}
//         </NavMenu>
//         {isAuthenticated ? (
//           <NavBtn className="nav-btn">
//             <NavBtnLink
//               onClick={() =>
//                 logout({ logoutParams: { returnTo: window.location.origin } })
//               }
//             >
//               Log Out
//             </NavBtnLink>
//           </NavBtn>
//         ) : (
//           <NavBtn className="nav-btn">
//             <NavBtnLink onClick={() => loginWithRedirect()}>
//               Log In/Register
//             </NavBtnLink>
//           </NavBtn>
//         )}
//       </Nav>
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./Navbar_element";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/flowtracklogo.png";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <Nav className="navbar">
        <NavLink to="/" className="nav-logo">
        <img src={logo} alt="logo" className="h-5 w-auto mr-2" />
        </NavLink>
        <Bars onClick={toggleNav} />
        <NavMenu $showNav={showNav}>
          <NavLink to="/work" className="nav-item">
            About Us
          </NavLink>
          <NavLink to="/policy" className="nav-item">
            DashBoard
          </NavLink>
          {/* <NavLink to="/collab" className="nav-item">
            Need a Dev?
          </NavLink> */}
        </NavMenu>
        {isAuthenticated ? (
          <NavBtn className="nav-btn">
            <NavBtnLink
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn className="nav-btn">
            <NavBtnLink onClick={() => loginWithRedirect()}>
              Log In/Register
            </NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;

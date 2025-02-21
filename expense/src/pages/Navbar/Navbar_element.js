// import {React,useState} from "react";
// import { toggleButtonGroupClasses } from "@mui/material";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Nav: Represents the navbar container element. It sets the background color, height, flex layout, padding, and applies a fade-in animation.

export const Nav = styled.nav`
  position: relative;
  margin-left: -2rem;
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc(100vh-1000px);
  z-index: 10;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

// NavLink: Represents a navigation link (using react-router-dom's NavLink). It sets the color, flex layout, text decoration, padding, and handles the active state by changing the color.

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

// Bars: Represents the hamburger icon for mobile navigation (using react-icons/fa's FaBars). It sets the display to none by default and becomes visible and positioned absolutely in the top right corner for screens with a maximum width of 768px.

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%); /* Modified: Add '%' symbol after -100 */
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
// NavMenu: Represents the container for the navigation menu items. It sets the flex layout and hides the menu items for screens with a maximum width of 768px.
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  /* margin-right: -24px; */

  /* Second Nav */
  margin-right: 24px;

  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */

  @media screen and (max-width: 768px) {
    display: ${({ showNav }) =>
      showNav
        ? "flex"
        : "none"}; /* Updated: Use showNav prop to control display */
    flex-direction: column; /* Added: Stack menu items vertically */
    position: absolute; /* Added: Position the menu absolutely */
    top: 80px; /* Added: Adjust top position based on navbar height */
    left: 0;
    width: 100%;
    background-color: #000;
    padding: 2rem;
  }
`;

// NavBtn: Represents the container for the navigation button. It sets the flex layout and hides the button for screens with a maximum width of 768px.
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// NavBtnLink: Represents the navigation button link (using react-router-dom's Link). It sets the border-radius, background color, padding, color, outline, border, and cursor. It also handles the hover state by changing the background and text color.

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  text-decoration: none;

  /* Second Nav */
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
    // text-decoration:underline;
  }
`;

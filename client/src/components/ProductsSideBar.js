import React from "react";
import { NavLink } from "react-router-dom";

const ProductsSideBar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#f97316" : "#64F3AC",
    };
  };
  return (
    <>
      <div className="sticky top-0 left-0 py-4 mx-auto bg-white h-96 mt-16">
        <ul className="space-y-3 mt-14">
          <li>
            <NavLink
              active
              style={navLinkStyles}
              to="/potmateproducts"
              className="flex items-center p-4 text-lg font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3">Pot Mates</span>
            </NavLink>
            <hr className="bg-gray-100 opacity-20" />
          </li>
          <li>
            <NavLink
              active
              style={navLinkStyles}
              to="/customizePotForm"
              className="flex items-center p-4 text-lg font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3">Customized Pots</span>
            </NavLink>
            <hr className="bg-gray-100 opacity-20" />
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              to="/plantproducts"
              className="flex items-center p-4 text-lg font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3">Plants</span>
            </NavLink>
            <hr className="bg-gray-100 opacity-20" />
          </li>
          <li>
            <NavLink
              style={navLinkStyles}
              to="/gardentoolsproducts"
              className="flex items-center p-4 text-lg font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3">Gardening Tools</span>
            </NavLink>
            <hr className="bg-gray-100 opacity-20" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProductsSideBar;

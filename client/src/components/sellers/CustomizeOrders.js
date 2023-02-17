import React, { useState, useEffect } from "react";
import SellerSideBar from "./SellerSideBar";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const CustomizeOrder = () => {
  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <SellerSideBar />
        </div>
        <section className="col-span-4">
          <h1 className="m-16 text-2xl">Customize Orders page</h1>
          <div className="flex justify-end">
            <Link
              to="/sellers/customizedorder/addcustomizeorder"
              className="mr-16 mt-16 rounded-lg px-6 text-lg py-3 bg-blue-500 text-white font-semibold"
              type="button"
            >
              + Add CustomizePot Order
            </Link>
          </div>
        
        </section>
      </main>
    </>
  );
};

export default CustomizeOrder;

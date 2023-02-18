import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const ADD_PRODUCT_URL = "sellers/Settings";

const Settings = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const [listings, setListings] = useState({
    productName: "",
    supplierName: "",
    supplierContactNo: "",
    supplierEmail: "",
    stockAmount: "",
    discount: "",
    unitWeight: "",
  });




  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      productName: listings.productName,
      supplierName: listings.supplierName,
      supplierContactNo: listings.supplierContactNo,
      supplierEmail: listings.supplierEmail,
      stockAmount: listings.stockAmount,
      discount: listings.discount,
      unitWeight: listings.unitWeight,
      category: listings.category,
     
    };

    try {
      await axios.post(ADD_PRODUCT_URL, data).then((res) => {
        if (res.data.error) {
          console.log(`${res.data.error}`);
        } else {
          
          setListings({
            productName: "",
            supplierName: "",
            supplierContactNo: "",
            supplierEmail: "",
            stockAmount: "",
            discount: "",
            unitWeight: "",
            category: "",
          });

          navigateTo("/");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <SellerSideBar />
        </div>
        <section className="col-span-4">
        
          <section className="col-span-4">
          
          <h1 className="m-16 text-2xl">
          <h1 className="m-16 text-2xl">
            <form onSubmit={handleSubmit} method="POST">
              {/* <div className="mb-6">
                <label
                  for="Username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  value={listings.productName}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      productName: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Sashini"
                  required
                />
              </div> */}
              <div className="mb-6">
                <label
                  for="Email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={listings.supplierName}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierName: e.target.value,
                    })
                  }
                  className="mt-5 text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="sashig@gmail.com"
                  required
                />
              </div>

              <div className="mt-16 mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Change password:
                </label>
                <input
                  type="text"
                  value={listings.supplierName}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierName: e.target.value,
                    })
                  }
                  className="mt-5 text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Old Password"
                  required
                />
                <br /> <br />
                <input
                  type="text"
                  value={listings.supplierName}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierName: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="New Password"
                  required
                />
                <br />
                <br />
                <input
                  type="text"
                  value={listings.supplierName}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierName: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Re-enter new Password"
                  required
                />
              </div>

              <br />

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </form>
          </h1>
          </h1>
        </section>
        </section>
      </main>
    </>
  );
};

export default Settings;

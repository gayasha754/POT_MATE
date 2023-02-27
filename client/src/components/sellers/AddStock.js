import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const ADD_STOCK_URL = "sellers/addstock";

const Addstock = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const [stock, setStock] = useState({
    productName: "",
    productID: "",
    stockAmount: "",
  });

  const handleSubmit = async (e) => {
    console.log("Handle submit function");
    e.preventDefault();
    let data = {
      productName: stock.productName,
      productID: stock.productID,
      stockAmount: stock.stockAmount,
    };

    axios.post(ADD_STOCK_URL, data).then((res) => {
      if (res.data.error) {
        console.log(`${res.data.error}`);
      } else if (res.data.success) {
        setStock({
          productName: "",
          productID: "",
          stockAmount: "",
        });
        window.alert("Stock successfully added");
        navigateTo("/sellers/profile/listings/");
      }
    });
  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <SellerSideBar />
        </div>
        <section className="col-span-4">
          <div className="flex justify-start">
            <Link
              to="/sellers/profile/listings/"
              className="mr-16 ml-16 mt-16 rounded-lg px-4 text-sm py-2 bg-gray-300 text-white font-semibold hover:bg-gray-700"
              type="button"
            >
              Go back
            </Link>
          </div>
          <h1 className="m-16 text-2xl">
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-6">
                <label
                  for="Product Name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  value={stock.productName}
                  onChange={(e) =>
                    setStock({
                      ...stock,
                      productName: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="product name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  value={stock.productID}
                  onChange={(e) =>
                    setStock({
                      ...stock,
                      productID: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Supplier name"
                  required
                />
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    for="grid-city"
                  >
                    Amount
                  </label>
                  <input
                    className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={stock.stockAmount}
                    onChange={(e) =>
                      setStock({
                        ...stock,
                        stockAmount: e.target.value,
                      })
                    }
                    placeholder="Stock Amount"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Stock
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default Addstock;

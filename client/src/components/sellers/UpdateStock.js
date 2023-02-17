import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const UPDATE_STOCK_URL = "sellers/updatestock";

const UpdateStock = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  
  const { id } = useParams()
  console.log(id)
  const GET_ONE_STOCK = `sellers/getStock/${id}`;

  const [ stock, setStocks] = useState();

  console.log("Stock id ->",id)
  


  useEffect(() => {
    axios.get(GET_ONE_STOCK).then((response) => {
      //  console.log(" Data in Update Stock-> ",response.data.stock[0])
      setStocks(response.data.stocks)
      console.log("stock: ",stock)
    })
  }, []); 

  const [listings, setListings] = useState({
    productName: "",
    productId: "",
    stockId: "",
    Amount: "",
  });

  useEffect(() => {
    setListings({ ...stock });
  }, [stock]);

  console.log("Stock Data after UseEffect ->", listings);

  // Handle Submit

  const handleSubmit = async (e) => {
    console.log("Handle submit function");
    e.preventDefault();
    let data = {
      // productName: listings.productName,
      // productID: listings.productId,
      // Amount: listings.Amount,
      ...listings,
    };

    console.log("Updated Data on updateStock js ->", data)

    axios.post(UPDATE_STOCK_URL, data).then((res) => {
      if (res.data.error) {
        console.log(`${res.data.error}`);
      } else if (res.data.success) {
        setListings({
          productName: "",
          productId: "",
          Amount: "",
        });
        window.alert("Stock successfully Updated");
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
                  value={listings.productName}
                  onChange={(e) =>
                    setListings({
                      ...listings,
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
                  value={listings.productId}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      productId: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Product id"
                  required
                />
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Amount
                  </label>
                  <input
                    className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={listings.Amount}
                    onChange={(e) =>
                      setListings({
                        ...listings,
                        Amount: e.target.value,
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
                Update Stock
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default UpdateStock;

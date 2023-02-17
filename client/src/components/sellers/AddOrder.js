import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const ADD_PRODUCT_URL = "sellers/addorder";
const UPLOAD_URL = "upload/products";

const AddOrder = () => {
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

  const [images, setImages] = useState({
    image1: "",
  });

  const [imageNames, setImageNames] = useState({
    image1: "",
  });

  const [category, setCategory] = useState();

  const handleSelectCategory = (e) => {
    e.preventDefault();

    setCategory(parseInt(e.target.value));
    setListings({ ...listings, category: parseInt(e.target.value) });
  };

  const uploadImages = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    //adding images
    formData.append(images.image1.name, images.image1);

    try {
      const res = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Contet-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
      image1: images.image1.name,
    };

    try {
      await axios.post(ADD_PRODUCT_URL, data).then((res) => {
        if (res.data.error) {
          console.log(`${res.data.error}`);
        } else {
          setImages({
            image1: "",
          });
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
          <div className="flex justify-start">
            <Link
              to="/sellers/profile/customizedorders/"
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
                  for="Product No"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product No
                </label>
                <input
                  type="text"
                  value={listings.productNo}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      productName: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="Product Category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Product Category
                </label>
                <input
                  type="text"
                  value={listings.category}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      productName: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  for="Customer No"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer No.
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
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Customer No"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="Customer Name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  value={listings.supplierContactNo}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierContactNo: e.target.value,
                    })
                  }
                  id=""
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Customer Name"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  for="Customer Contact no."
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Customer Contact no.
                </label>
                <input
                  type="text"
                  value={listings.supplierContactNo}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierContactNo: e.target.value,
                    })
                  }
                  id=""
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Customer Contact no."
                  required
                />
              </div>
           
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Quantity
                  </label>
                  <input
                    className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={listings.stockAmount}
                    onChange={(e) =>
                      setListings({
                        ...listings,
                        stockAmount: e.target.value,
                      })
                    }
                    placeholder="Quantity"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Total /Rs.
                  </label>
                  <input
                    className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    value={listings.discount}
                    onChange={(e) =>
                      setListings({
                        ...listings,
                        discount: e.target.value,
                      })
                    }
                    placeholder="Enter Total"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    WEIGHT /g
                  </label>
                  <input
                    className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    value={listings.unitWeight}
                    onChange={(e) =>
                      setListings({
                        ...listings,
                        unitWeight: e.target.value,
                      })
                    }
                    placeholder="Enter weight"
                  />
                </div>
              </div>

              {/* <div className="flex flex-row mb-6">
                <div className="mb-6 w-full">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    name=""
                    id=""
                    onChange={handleSelectCategory}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="0" aria-readonly>
                      Select a Category
                    </option>
                    <option value="1">PotMate</option>
                    <option value="2">Plants</option>
                    <option value="3">Customizable pot</option>
                    <option value="4">Gardening tools</option>
                  </select>
                </div>
               
              </div> */}

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default AddOrder;

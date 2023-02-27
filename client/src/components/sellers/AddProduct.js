import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const ADD_PRODUCT_URL = "sellers/addproduct";
const UPLOAD_URL = "upload/products";

const AddProduct = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const [listings, setListings] = useState({
    productName: "",
    supplierName: "",
    supplierContactNo: "",
    supplierEmail: "",
    stockAmount: "",
    price: "",
    discount: "",
    unitWeight: "",
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
    formData.append(listings.image1.name, listings.image1);

    try {
      const res = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Contet-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    console.log("Handle submit function");
    e.preventDefault();
    let data = {
      productName: listings.productName,
      supplierName: listings.supplierName,
      supplierContactNo: listings.supplierContactNo,
      supplierEmail: listings.supplierEmail,
      stockAmount: listings.stockAmount,
      price: listings.price,
      discount: listings.discount,
      unitWeight: listings.unitWeight,
      category: listings.category,
      image1: listings.image1.name,
    };

    axios.post(ADD_PRODUCT_URL, data).then((res) => {
      if (res.data.error) {
        console.log(`${res.data.error}`);
      } else if (res.data.success) {
        setListings({
          productName: "",
          supplierName: "",
          supplierContactNo: "",
          supplierEmail: "",
          stockAmount: "",
          price: "",
          discount: "",
          unitWeight: "",
          category: "",
          image1: "",
        });

        window.alert("Product successfully added");
        navigateTo("/sellers/profile/sellerProducts");
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
              to="/sellers/profile/sellerProducts/"
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
                  for="email"
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
                  Supplier Name
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
                  placeholder="Supplier name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Supplier Contact Number
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
                  placeholder="supplier contact no"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Supplier email
                </label>
                <input
                  type="email"
                  value={listings.supplierEmail}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      supplierEmail: e.target.value,
                    })
                  }
                  id="email"
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    for="grid-city"
                  >
                    Stock Amount
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
                    placeholder="Stock Amount"
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    for="grid-city"
                  >
                    Price
                  </label>
                  <input
                    className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={listings.price}
                    onChange={(e) =>
                      setListings({
                        ...listings,
                        price: e.target.value,
                      })
                    }
                    placeholder="Unit Price"
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    for="grid-zip"
                  >
                    Discount /Rs.
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
                    placeholder="Enter discount"
                  />
                </div>
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900"
                    for="grid-zip"
                  >
                    Unit Weight /g
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
                    placeholder="Enter unit weight"
                  />
                </div>
              </div>

              <div className="flex flex-row mb-6">
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
                    <option value="2">Customizing Pot</option>
                    <option value="3">Plant</option>
                    <option value="4">Gardening tool</option>
                  </select>
                </div>
                <div className="flex items-center ml-96 mt-8 w-1/2 mb-12">
                  <label
                    for="toogleA"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="relative">
                      <input id="toogleA" type="checkbox" className="sr-only" />
                      <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                      <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                    <div className="ml-3 text-gray-700 text-sm">
                      Make Invisible
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex mb-6">
                <label
                  htmlFor="file_input"
                  className="block mb-3 text-sm font-medium text-gray-900"
                >
                  Upload the image:
                </label>
                <input
                  className="block mx-8 p-2.5 w-1/2 text-sm shadow-sm text-gray-600 bg-white rounded-lg border border-gray-300 cursor-pointer "
                  id="multiple_files"
                  type="file"
                  onChange={(e) => {
                    setListings({
                      ...listings,
                      image1: e.target.files[0],
                    });
                  }}
                />
                <button
                  className="m-8 w-20 px-4 text-sm py-2 bg-gray-500 text-white rounded"
                  type="submit"
                  onClick={uploadImages}
                >
                  Upload Files
                </button>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add product
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default AddProduct;

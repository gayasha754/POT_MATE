import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const ADD_PRODUCT_URL = "sellers/addcustomizedorder";
const UPLOAD_URL = "upload/products";

const AddCustomizedOrder = () => {
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
              to="/sellers/profile/customizedorders"
              className="mr-16 ml-16 mt-16 rounded-lg px-4 text-sm py-2 bg-gray-300 text-white font-semibold hover:bg-gray-700"
              type="button"
            >
              Go back
            </Link>
          </div>
          <section className="col-span-4">
          
          <h1 className="m-16 text-2xl">
          <form onSubmit={handleSubmit} method="POST">
              <div className="mb-6">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select a Pot
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
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select a Plant
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
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Write the caption to be printed (Word Limit : 5 words):
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
                  placeholder="Caption..."
                  required
                />
              </div>

              <div className="flex mb-6">
                <label
                  htmlFor="file_input"
                  className="block mb-3 text-sm font-medium text-gray-900"
                >
                  Upload the caption to be printed (Word Limit : 5 words):
                </label>

                <input
                  className="block mx-8 p-2.5 w-1/2 text-sm shadow-sm text-gray-600 bg-white rounded-lg border border-gray-300 cursor-pointer "
                  id="multiple_files"
                  type="file"
                  onChange={(e) => {
                    setImages({
                      ...images,
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

              <div className="mb-6 w-full">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select Font Style*
                </label>
                <select
                  name=""
                  id=""
                  onChange={handleSelectCategory}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select-
                  </option>
                  <option value="1">Ariel</option>
                  <option value="2">Times New Roman</option>
                  <option value="3">Calibri</option>
                  <option value="4">Poppins</option>
                </select>
              </div>
              <div className="mb-6 w-full">
                <label
                  for="Font Colour"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Font Colour *
                </label>
                <select
                  name=""
                  id=""
                  onChange={handleSelectCategory}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select-
                  </option>
                  <option value="1">Black</option>
                  <option value="2">Blue</option>
                  <option value="3">Gold</option>
                  <option value="4">Green</option>
                  <option value="5">Purple</option>
                  <option value="6">Red</option>
                </select>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    htmlFor="fontSize"
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Font size *
                  </label>

                  <input
                    type="number"
                    class="text-sm mt-5 px-5 py-3 border border-gray-600 rounded w-20 h-10"
                    //   value={10}
                    onChange={(e) => {
                      // setQt(e.target.value);
                      // setProduct({ ...product, qt: e.target.value });
                    }}
                  />
                </div>
              </div>

              <br />

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </h1>
        </section>
        </section>
      </main>
    </>
  );
};

export default AddCustomizedOrder;

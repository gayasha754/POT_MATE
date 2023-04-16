import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import ProductsSideBar from "../ProductsSideBar";

const ADD_CUSTOMORDER_URL = "buyers/addcustomizedpotorder";
const UPLOADCAPTION_URL = "upload/products";

const CustomizePotForm = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const [listings, setListings] = useState({
    plant_id: "",
    pot_id: "",
    caption_image: "",
    font_style: "",
    test_color: "",
    font_size: "",
    order_address: "",
    contact: "",
    status: "",
  });

  const [fontSize, setfontSize] = useState();

  //Font size
  const [qt, setQt] = useState(9);

 
  const [fontStyle, setFontStyle] = useState();
  const [testColor, setTestColor] = useState();
  const [font, setFontSize] = useState();
  const [potNo, setPotNo] = useState();
  const [plantNo, setPlantNo] = useState();



  const handleSelectFontStyle = (e) => {
    e.preventDefault();
    setFontStyle(parseInt(e.target.value));
    setListings({ ...listings, font_style: parseInt(e.target.value) });
  };

  const handleSelectTestColor = (e) => {
    e.preventDefault();
    setTestColor(parseInt(e.target.value));
    setListings({ ...listings, test_color: parseInt(e.target.value) });
  };

  const handleSelectFontSize = (e) => {
    e.preventDefault();
    setFontSize(parseInt(e.target.value));
    setListings({ ...listings, font_size: parseInt(e.target.value) });
  };
  
  const handleSelectPot = (e) => {
    e.preventDefault();
    setPotNo(parseInt(e.target.value));
    setListings({ ...listings, pot_id: parseInt(e.target.value) });
  };

  const handleSelectPlant = (e) => {
    e.preventDefault();
    setPlantNo(parseInt(e.target.value));
    setListings({ ...listings, plant_id: parseInt(e.target.value) });
  };

  const uploadImages = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    //adding images
    formData.append(listings.caption_image.name, listings.caption_image);

    try {
      const res = await axios.post(UPLOADCAPTION_URL, formData, {
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
    console.log("Handle submit function");
    e.preventDefault();
    let data = {
      plant_id: listings.plant_id+".jpg",
      pot_id: listings.pot_id+".jpg",
      caption_image: listings.caption_image.name,
      font_style: listings.font_style,
      test_color: listings.test_color,
      font_size: listings.font_size,
      order_address: listings.order_address,
      contact: listings.contact,
      status: "pending",
    };
    console.log("--------------caption_image: ",listings.caption_image.name);
    console.log("--------------data: ",data);

    try {
      await 
      axios.post(ADD_CUSTOMORDER_URL, data).then((res) => {
        if (res.data.error) {
          
          console.log(`${res.data.error}`);
        } else if (res.data.success) {          
          setListings({
            plant_id: "",
            pot_id: "",
            caption_image: "",
            font_style: "",
            test_color: "",
            font_size: "",
            order_address: "",
            contact: "",
            status: "",
          });
          window.alert("Order successfully added");
          navigateTo("/");
        }
      });
    } catch (err) {
      window.alert("Order placement failed ");
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <ProductsSideBar />
        </div>

        <section className="col-span-4">
          <h1 className="m-16 text-2xl">
            <form onSubmit={handleSubmit} method="POST">

              {/* Select a Pot */}
              <div className="mb-6">
                <label
                  for="Select a Pot"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select a Pot
                </label>
              
                <div className=" mt-8 flex flex-row">
                  <div className="flex justify-left font-medium items-center w-full h-24">
                    1
                    <img
                      src={`http://localhost:3500/products/1.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className=" flex justify-center font-medium items-center w-full h-24">
                    2
                    <img
                      src={`http://localhost:3500/products/2.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className="flex justify-center font-medium items-center w-full h-24">
                    3
                    <img
                      src={`http://localhost:3500/products/3.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className=" flex justify-center font-medium items-center w-full h-24">
                    4
                    <img
                      src={`http://localhost:3500/products/4.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className="flex justify-center font-medium items-center w-full h-24">
                    5
                    <img
                      src={`http://localhost:3500/products/5.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className=" flex justify-center font-medium items-center w-full h-24">
                    6
                    <img
                      src={`http://localhost:3500/products/6.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                </div>
                <div className=" mt-8 flex flex-row">
                <select
                  name=""
                  id=""
                  onChange={handleSelectPot}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select a Pot Number-
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                </div>

              </div>

              {/* Select a Plant */}
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Select a Plant
                </label>
             
                <div className=" mt-8 flex flex-row">
                  <div className="flex justify-left font-medium items-center w-full h-24">
                    1
                    <img
                      src={`http://localhost:3500/products/7.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className=" flex justify-center font-medium items-center w-full h-24">
                    2
                    <img
                      src={`http://localhost:3500/products/8.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className="flex justify-center font-medium items-center w-full h-24">
                    3
                    <img
                      src={`http://localhost:3500/products/9.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  <div className=" flex justify-center font-medium items-center w-full h-24">
                    4
                    <img
                      src={`http://localhost:3500/products/10.jpg`}
                      className="m-4 h-full"
                    />
                  </div>
                  
                </div>
                <div className=" mt-8 flex flex-row">
                <select
                  name=""
                  id=""
                  onChange={handleSelectPlant}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select a Plant Number-
                  </option>
                  <option value="7">1</option>
                  <option value="8">2</option>
                  <option value="9">3</option>
                  <option value="10">4</option>
                </select>
                </div>

              </div>

             

                {/* Upload Files */}
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
                    setListings({
                      ...listings,
                      caption_image: e.target.files[0],
                    });
                  }}
                />
                <button
                  className="m-8 w-20 px-4 text-sm py-2 bg-gray-500 text-white rounded"
                  type="submit"
                  onClick={uploadImages}
                >
                  Upload image
                </button>
              </div>

                {/* Select Font Style* */}
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
                  onChange={handleSelectFontStyle}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select-
                  </option>
                  <option value="1">Ariel</option>
                  <option value="2">Calibri</option>
                  <option value="3">Poppins</option>
                  <option value="4">Sans serif</option>
                </select>
              </div>

              {/* Font Colour * */}
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
                  onChange={handleSelectTestColor}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select-
                  </option>
                  <option value="1">Black</option>
                  <option value="2">Gold</option>
                </select>
              </div>

              {/* Font size * */}

              <div className="mb-6 w-full">
                <label
                  for="Font Colour"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Font Size *
                </label>
                <select
                  name=""
                  id=""
                  onChange={handleSelectFontSize}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="0" aria-readonly>
                    -Select-
                  </option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                </select>
              </div>


              {/* Delivery Address */}
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Order Delivery Address: 
                </label>
                <input
                  type="text"
                  value={listings.order_address}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      order_address: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Delivery Address"
                  required
                />
              </div>

               {/* Delivery Address */}
               <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contact Number: 
                </label>
                <input
                  type="text"
                  value={listings.contact}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      contact: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Enter Contact Number"
                  required
                />
              </div>


              <br />

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Pay Now
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default CustomizePotForm;

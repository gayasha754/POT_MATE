import Navbar from "../NavBar";
import React from "react";
import category1 from "../../images/category1.jpg";
import category2 from "../../images/category2.jpg";
import category3 from "../../images/category3.jpg";
import best1 from "../../images/best1.jpg";
import best2 from "../../images/best2.jpg";
import best3 from "../../images/best3.jpg";
import best4 from "../../images/best4.jpg";
import best5 from "../../images/best5.png";
import { Link } from "react-router-dom";

import Footer from "../Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div class="grid grid-cols-3 gap-8">
        <Link to="/potmateproducts">
          <div
            className=" flex justify-center bg-cover bg-center h-96 mt-20 m-8 border-solid border-1 border-gray-500"
            style={{ backgroundImage: `url(${category1})` }}
          >
            <div className="content-center bg-gray-100 bg-opacity-70 my-44 text-black-400	font-bold text-3xl font-mono tracking-wide drop-shadow-2xl">
              Pot Mates
            </div>
          </div>
        </Link>
        <Link to="/customizePotForm">
          <div
            className=" flex justify-center bg-cover bg-center h-96 mt-20 m-8 border-solid border-1 border-gray-500"
            style={{ backgroundImage: `url(${category2})` }}
          >
            <div className=" content-center bg-gray-100 bg-opacity-70 my-44 text-black-400	font-bold text-3xl font-mono tracking-wide">
              Customized Pots
            </div>
          </div>
        </Link>
        <Link to="/gardentoolsproducts">
          <div
            className=" flex justify-center bg-cover bg-center h-96 mt-20 m-8 border-solid border-1 border-gray-500"
            style={{ backgroundImage: `url(${category3})` }}
          >
            <div className="content-center bg-gray-100 bg-opacity-70 my-44 text-black-400	font-bold text-3xl font-mono tracking-wide drop-shadow-2xl">
              Gardening Tools
            </div>
          </div>
        </Link>
      </div>

      <section className="col-span-5">
        <h1 className="mt-16 mb-8 pl-8 text-gray-700 text-4xl font-semibold pt-8">
          <div className="text-center">Best Selling Products</div>
        </h1>

        <div className="container flex flex-wrap mx-auto pt-16 pb-16">
          <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/5 p-4">
            <Link
              to={`/products/`}
              className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={best1}
                  alt="product"
                />
              </div>
              <div className="p-4">
                <h2 className="mt-2 mb-2 font-bold">Amy Pot Mate</h2>

                <div className="mt-3 flex items-center justify-center">
                  <span className="text-sm font-semibold">LKR</span>&nbsp;
                  <span className="font-bold text-2xl">200</span>
                  &nbsp;
                  <span className="text-sm font-semibold">Rs.</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/5 p-4">
            <Link
              to={`/products/`}
              className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={best2}
                  alt="product"
                />
              </div>
              <div className="p-4">
                <h2 className="mt-2 mb-2 font-bold">Beth Pot Mate</h2>

                <div className="mt-3 flex items-center justify-center">
                  <span className="text-sm font-semibold">LKR</span>&nbsp;
                  <span className="font-bold text-2xl">200</span>
                  &nbsp;
                  <span className="text-sm font-semibold">Rs.</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/5 p-4">
            <Link
              to={`/products/`}
              className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={best3}
                  alt="product"
                />
              </div>
              <div className="p-4">
                <h2 className="mt-2 mb-2 font-bold">Stella Pot Mate</h2>

                <div className="mt-3 flex items-center justify-center">
                  <span className="text-sm font-semibold">LKR</span>&nbsp;
                  <span className="font-bold text-2xl">200</span>
                  &nbsp;
                  <span className="text-sm font-semibold">Rs.</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/5 p-4">
            <Link
              to={`/products/`}
              className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={best4}
                  alt="product"
                />
              </div>
              <div className="p-4">
                <h2 className="mt-2 mb-2 font-bold">Ben Pot Mate</h2>

                <div className="mt-3 flex items-center justify-center">
                  <span className="text-sm font-semibold">LKR</span>&nbsp;
                  <span className="font-bold text-2xl">200</span>
                  &nbsp;
                  <span className="text-sm font-semibold">Rs.</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/5 p-4">
            <Link
              to={`/products/`}
              className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={best5}
                  alt="product"
                />
              </div>
              <div className="p-4">
                <h2 className="mt-2 mb-2 font-bold">Juli Pot Mate</h2>

                <div className="mt-3 flex items-center justify-center">
                  <span className="text-sm font-semibold">LKR</span>&nbsp;
                  <span className="font-bold text-2xl">200</span>
                  &nbsp;
                  <span className="text-sm font-semibold">Rs.</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

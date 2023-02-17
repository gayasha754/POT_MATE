import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import NavBar from "./NavBar";
import ProductsSideBar from "./ProductsSideBar";
import { Link } from "react-router-dom";

const GET_PLANTPRODUCTS_URL = `/root/getplantproducts`;

const Products_Plants = () => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    axios.get(GET_PLANTPRODUCTS_URL).then((response) => {
      console.log(response.data.products);
      setProductList(response.data.products);
    });
  }, []);

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <ProductsSideBar />
        </div>
        <section className="col-span-4">
          <div className="container flex flex-wrap mx-auto pt-16">
            {productList?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4"
                >
                  <Link
                    to={`/products/${product.id}`}
                    className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
                  >
                    <div className="relative pb-48 overflow-hidden">
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={`http://localhost:3500/products/${product.image}`}
                        alt="product"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="mt-2 mb-2 font-bold">
                        {product.productName}
                      </h2>

                      <div className="mt-3 flex items-center justify-center">
                        <span className="text-sm font-semibold">LKR</span>&nbsp;
                        <span className="font-bold text-2xl">
                          {product.price}
                        </span>
                        &nbsp;
                        <span className="text-sm font-semibold">Rs.</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            ;
          </div>
        </section>
      </main>
    </>
  );
};

export default Products_Plants;

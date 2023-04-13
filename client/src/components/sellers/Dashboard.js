import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";
import NavBar from "../NavBar";
import AnnualSalesData from "./AnnualSalesData";

const Dashboard = () => {

  const { auth } = useAuth();

  const [salescount, setSalesCount] = useState();
  const [orderscount, setOrdersCount] = useState();
  const [productscount, setProductsCount] = useState();


  const GET_SALES_URL = "sellers/getsales";
  const GET_ORDERS_URL = "sellers/getorders";
  const GET_PRODUCTS_URL = "sellers/getProducts";

  useEffect(() => {
    
    axios.post(GET_SALES_URL).then((response) => {
      setSalesCount(response.data.request);
    });
  }, []);
  useEffect(() => {
    
    axios.post(GET_ORDERS_URL).then((response) => {
      setOrdersCount(response.data.request);
    });
  }, []);
  useEffect(() => {
    
    axios.post(GET_PRODUCTS_URL).then((response) => {
      setProductsCount(response.data.request);
    });
  }, []);

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <SellerSideBar />
        </div>
        <section className="m-4 col-span-4">
          <section>
            <div className="container px-6 py-10 mx-auto">
              <div className="w-full bg-gray-300 h-10">
                <p className="ml-5 mt-4 p-2 font-medium">Welcome Admin!</p>
              </div>
              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-8 xl:gap-8 md:grid-cols-2 xl:grid-cols-3">
                <div className="h-36 p-4 space-y-3 border-2 border-gray-200 rounded-lg">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="clear-both text-gray-400 w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                      />
                    </svg>
                    <p className="pl-16 pb-4 text-xl font-semibold text-gray-400 capitalize">
                      Total sales
                    </p>
                  </div>
                  {/* <p className="text-gray-600 text-4xl text-center w-full">
                    Rs. 12000
                  </p> */}
                  <p className="text-gray-600 text-4xl text-center w-full">
                    Rs 
                    {/* {salescount?.sales == "0"
                      ? parseFloat(salescount?.sales).toFixed(2)
                      : "0.00"} */}
                      {salescount?.sales.toFixed(2)}
                  </p>
                </div>

                <div className="h-36 p-4 space-y-3 border-2 border-gray-200 rounded-lg">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="clear-both text-gray-400 w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                      />
                    </svg>
                    <p className="pl-16 pb-4 text-xl font-semibold text-gray-400 capitalize">
                      Total Products
                    </p>
                  </div>
                  {/* <p className="text-gray-600 text-4xl text-center w-full">
                    120
                  </p> */}
                  <p className="text-gray-600 text-4xl text-center w-full">
                    {productscount?.product_count}
                  </p>
                </div>

                <div className="h-36 p-4 space-y-3 border-2 border-gray-200 rounded-lg">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="clear-both text-gray-400 w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                      />
                    </svg>
                    <p className="pl-16 pb-4 text-xl font-semibold text-gray-400 capitalize">
                      Total Orders
                    </p>
                  </div>
                  {/* <p className="text-gray-600 text-4xl text-center w-full">
                    540
                  </p> */}
                  <p className="text-gray-600 text-4xl text-center w-full">
                    {orderscount?.order_count}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mx-16 ">
              <div className="grid grid-cols-4">
                <div className="col-span-4 text-gray-600 text-3xl p-32 px-32 mt-0">
                  Total Sales During The Year
                </div>
                <div className="col-span-4">
                  <AnnualSalesData />
                </div>
              </div>
            </div>
            
          </section>
        </section>
      </main>
    </>
  );
};

export default Dashboard;

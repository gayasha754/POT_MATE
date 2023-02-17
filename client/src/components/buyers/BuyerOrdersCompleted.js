import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";

const GET_ORDER_ITEMS_COMPLETED_URL = "buyers/orders/completed";

const BuyerOrdersCompleted = () => {
  const { auth } = useAuth();

  const [listOfOrders, setListOfOrders] = useState();

  useEffect(() => {
    const data = {
      buyerID: auth.user.id,
    };

    axios.post(GET_ORDER_ITEMS_COMPLETED_URL, data).then((response) => {
      console.log(response.data.orders);
      setListOfOrders(response.data.orders);
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-5">
        <div className="m-4 col-span-4 border-gray-200 dark:border-gray-700">
          <ul className="mt-20 mx-14 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
            <li className="w-48 rounded-t-lg bg-gray-200">
              <Link
                to="/buyers/orders"
                aria-current="page"
                className="inline-block p-4 text-base rounded-t-lg"
              >
                Pending
              </Link>
            </li>
            <li className="w-48 rounded-t-lg bg-gray-100 border border-gray-200">
              <Link
                to="/buyers/orders/completed"
                className="inline-block p-4 text-orange-500 text-base active "
              >
                Completed
              </Link>
            </li>
          </ul>
          <div>
            <div className="grid grid-cols-5 text-center m-8">
              <div className="flex justify-center items-center font-medium col-span-2 text-gray-400 w-full h-12 mx-auto">
                Item
              </div>
              <div className="flex justify-center items-center font-medium text-gray-400 w-full h-12">
                Rating
              </div>
              <div className="flex justify-center items-center font-medium text-gray-400 w-full h-12">
                Status
              </div>
              <div className="flex justify-center items-center font-medium text-gray-400 w-full h-12"></div>
            </div>

            {listOfOrders?.map((value) => {
              return (
                <div key={value.orderItemID}>
                  <div className="grid grid-cols-5 text-center m-8 mt-0 shadow-md rounded-md">
                    <div className="flex justify-center text-base items-center col-span-2 w-full h-24">
                      <div className="flex">
                        <img
                          src={`http://localhost:3500/products/${value.image}`}
                          className=" h-24  p-5"
                        />
                        <div className="my-2">
                          <p className="text-left">{value.productName}</p>
                          <div className="flex justify-start text-left text-sm text-gray-500 py-1 ">
                            <p className=" pr-3">
                              Price{" :"}
                              <span>
                                LKR {parseFloat(value.orderPrice).toFixed(2)}
                              </span>
                            </p>
                            <p>
                              Qty :<span>{value.orderQuantity}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center text-base items-center w-full h-24">
                      {value.productRating} Stars
                    </div>
                    <div className="flex justify-center text-xs items-center w-full h-24 text-gray-500">
                      <p className="text-base font-bold text-green-500">
                        Completed
                      </p>
                    </div>
                    <div className="flex justify-center text-xs items-center w-full h-24 text-gray-500">
                      <Link to={`/product/form/${value.id}`}>
                        <button className=" text-white bg-gray-900 hover:bg-orange-500 hover:text-white w-32 py-3 px-2 rounded-md">
                          Re-Order
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerOrdersCompleted;

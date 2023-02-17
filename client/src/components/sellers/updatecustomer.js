import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";
import SellerSideBar from "./SellerSideBar";

const ADD_CUSTOMER_URL = "sellers/updatecustomer";


const UpdateCustomer = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const [customers, setcustomers] = useState({
    username: "",
    email: "",
    password: "",
    
  });

  
  const handleSubmit = async (e) => {
    console.log("Handle submit function");
    e.preventDefault();
    let data = {
      username: customers.username,
      email: customers.email,
      password: customers.password,
    };

    // try {
    //   await 
      axios.post(ADD_CUSTOMER_URL, data).then((res) => {
        if (res.data.error) {
          console.log(`${res.data.error}`);
        } else if (res.data.success) {
          setcustomers({
            username: "",
            email: "",
            password: "",
          });
          window.alert("Customer successfully added");
          navigateTo("/sellers/profile/customers/");
        }
      });
    // } catch (err) {
    //   console.log(err);
    // }
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
              to="/sellers/profile/customers"
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
                  for="Username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  value={customers.username}
                  onChange={(e) =>
                    setcustomers({
                      ...customers,
                      username: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={customers.email}
                  onChange={(e) =>
                    setcustomers({
                      ...customers,
                      email: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for=""
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="text"
                  value={customers.password}
                  onChange={(e) =>
                    setcustomers({
                      ...customers,
                      password: e.target.value,
                    })
                  }
                  id=""
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Password"
                  required
                />
              </div>

              
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Customer
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default UpdateCustomer;

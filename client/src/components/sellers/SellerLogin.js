import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import logo from "../../images/logo.jpg";
import useAuth from "../../hooks/useAuth";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const SELLER_LOGIN_URL = "sellers/login";

const SellerLogin = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/sellers/profile";

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(SELLER_LOGIN_URL, user).then((response) => {
      if (response.data.error) {
        console.log(`${response.data.error}`);
      } else {
        setAuth({
          user: response.data.user,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        });
        setUser({
          email: "",
          password: "",
        });
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <>
      <div className=" bg-teal-400 grid grid-cols-8">
        <div className="col-span-2 bg-teal-400 h-screen relative">
          <Link to="/">
            <img
              className="m-8 absolute w-32 rounded-full"
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="col-span-4 my-auto">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="p-16 bg-white w-9/12"
            >
              <h1 className="text-5xl font-bold mb-5 text-teal-400">
                Welcome Admin!
              </h1>

              <div className="mt-10">
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-3 text-sm font-medium text-gray-500"
                  >
                    Email :
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="block w-full p-2.5 shadow-sm bg-white-500 border border-gray-300 text-gray-900 text- rounded-lg"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="block mb-3 text-sm font-medium text-gray-500"
                  >
                    Password :
                  </label>
                  <input
                    type={type}
                    id="password"
                    className="block w-full p-2.5 shadow-sm bg-white-500 border border-gray-300 text-gray-900 text- rounded-lg"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                  <div
                    onClick={handleToggle}
                    class="absolute top-5 right-8 h-16 hover: pr-0 flex items-center text-sm leading-5 "
                  >
                    <Icon icon={icon} size={20} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-8 mb-8 text-white bg-teal-400 hover:bg-gray-800 font-medium rounded-lg text-md px-5 py-4 text-center w-full"
                >
                  Login
                </button>

                
              </div>
              
            </form>
          </div>
        </div>
        <div className="col-span-2 bg-teal-400 h-screen relative"></div>
      </div>
    </>
  );
};

export default SellerLogin;

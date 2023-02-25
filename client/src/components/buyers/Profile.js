import React, { useState, useRef, useEffect} from "react";
import { NavLink, useNavigate,useParams } from "react-router-dom";
import axios from "../../api/axios";
import NavBar from "../NavBar";
import useAuth from "../../hooks/useAuth";

const UPDATE_PROFILE_URL = "/profile";

//regex for validations
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Profile = () => {
  const { auth } = useAuth();
  const navigateTo = useNavigate();

  const [type, setType] = useState("password");

  // const { id } = useParams();
  // console.log(id)
  const GET_USER_DETAIL_URL = `buyers/profile`;

  const [ user, setUsers] = useState();

  // console.log("User id ->",id)

  useEffect(() => {
    const data = {
      buyerId: auth.user.id,
    };
  console.log("User id ->",data)

    axios.get(GET_USER_DETAIL_URL, data).then((response) => {
      //  console.log(" Data in profile-> ",response.data.user[0])
      setUsers(response.data.users)
      console.log("user: ",user)
    })
  }, []); 

  const [listings, setListings] = useState({
    username: "",
    email: "",
    newPassword: "",
  });

  useEffect(() => {
    setListings({ ...user });
  }, [user]);

  console.log("Customer Data after UseEffect ->", listings);

  const handleSelectCategory = (e) => {
    e.preventDefault();

    setListings({ ...listings, category: parseInt(e.target.value) });
  };

  const handleSubmit = async (e) => {
    console.log("Handle submit function");
    e.preventDefault();
    let data = {
      // username: listings.username,
      // email: listings.email,
      // newPassword: listings.newPassword,
      ...listings,
    };

    console.log("Updated Data on updateStock js ->", data)

/*
    try {
      await axios.post(ADD_PROFILE_URL, data).then((res) => {
        if (res.data.error) {
          console.log(`${res.data.error}`);
        } else {
          setListings({
            username: "",
            email: "",
            newPassword: "",
          });

          navigateTo("/");
        }
      });
    } catch (err) {
      console.log(err);
    }*/

    axios.post(UPDATE_PROFILE_URL, data).then((res) => {
      if (res.data.error) {
        console.log(`${res.data.error}`);
      } else if (res.data.success) {
        setListings({
          username: "",
          email: "",
          newPassword: "",
        });
        window.alert("Profile successfully Updated");
        navigateTo("/profile");
      }
    });

  };

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <section className="ml-96 col-span-5 w-1/2">
          <NavLink to="/buyers/orders">
            <div className="flex flex-raw justify-end mr-16">
              <button
                type="submit"
                className="mt-8 text-white bg-gray-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Your Orders
              </button>
            </div>
          </NavLink>

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
                  value={listings.username}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      username: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Sashini"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="Email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={listings.email}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      email: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="sashig@gmail.com"
                  required
                />
              </div>

              <div className="mt-16 mb-6">
                <label
                  for="Change password:"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Change password:
                </label>
                {/* <input
                  type={type}
                  value={listings.oldPassword}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      oldPassword: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Old Password"
                  required
                /> */}
                <br />
                <input
                  type={type}
                  value={listings.password}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      password: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="New Password"
                  required
                />
                <br />
                <br />
                <input
                  type={type}
                  value={listings.newPassword}
                  onChange={(e) =>
                    setListings({
                      ...listings,
                      newPassword: e.target.value,
                    })
                  }
                  className="text-sm w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Re-enter new Password"
                  required
                />
              </div>
              <br />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </form>
          </h1>
        </section>
      </main>
    </>
  );
};

export default Profile;

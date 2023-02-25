import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import NavBar from "./NavBar";
import useCart from "../hooks/useCart";

const ProductView = () => {
  const { cart, setCart } = useCart();

  const { id } = useParams();
  const GET_PRODUCT_DETAILS_URL = `root/getproducts/${id}`;

  const [product, setProduct] = useState();
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [qt, setQt] = useState(1);

  const [cartSuccess, setCartSuccess] = useState(false);

  useEffect(() => {
    axios.get(GET_PRODUCT_DETAILS_URL).then((response) => {
      setProduct(response.data.products);
    });
  }, []);

  const addToCart = (e) => {
    e.preventDefault();

    let itemCount = cart.count;
    const isItemAlreadyAdded = cart.cartItems.some(
      (item) => item.id == product.id
    );

    if (isItemAlreadyAdded) {
      setCartSuccess(true);
      // setAlreadyAdded(true);
      // setTimeout(() => {
      //   setAlreadyAdded(false);
      // }, 3000);
      setTimeout(() => {
        setCartSuccess(false);
      }, 1000);
    } else {
      console.log(product);
      let items = cart.cartItems.push(product);
      setCart({ ...cart, cartItems: items });
      setCart({
        ...cart,
        count: ++itemCount,
      });
      setCartSuccess(true);
      setTimeout(() => {
        setCartSuccess(false);
      }, 1000);
    }
  };

  return (
    <>
      <NavBar />
      <div class="grid grid-cols-2 gap-6">
        <div class="p-10 col-span-1 border-r-2">
          <img
            src={`http://localhost:3500/products/${product?.image}`}
            class="w-auto h-auto"
            alt=""
          />
        </div>

        <div class="col-span-1 p-10">
          <p class="text-2xl">{product?.productName}</p>
          <div class="flex gap-1 mt-1">
            <p class="mt-1 ml-3 text-green-500">in-stock</p>
          </div>
          <p class="text-gray-900 text-4xl mb-2">
            <b>Rs. {product?.price}.00</b>
          </p>

          <p class="text-gray-500">Deliver to islandwide</p>
          <form action="" class="mt-5">
            <br />
            <label htmlFor="qt" className="mb-5">
              Quantity *
            </label>
            <br />
            <input
              type="number"
              min="1"
              class="mt-5 px-5 py-3 border border-gray-600 rounded w-20 h-10"
              value={qt}
              onChange={(e) => {
                setQt(e.target.value);
                setProduct({ ...product, qt: e.target.value });
              }}
            />

            <div class="mt-14">
              <button
                class="rounded font-semibold shadow-lg text-white bg-orange-500 p-2.5 w-60"
                type="button"
                value="Add to Cart"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </form>

          {cartSuccess && (
            <>
              <div className="flex mt-5 px-3 py-2 bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#16a34a"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-green-500">Item Added to the Cart</p>
              </div>
            </>
          )}

          {alreadyAdded && (
            <>
              <div className="flex mt-5 px-3 py-2 bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#16a34a"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-green-500">
                  Item Already In the Cart
                </p>
              </div>
            </>
          )}

          <div class=" flex flex-col justify-center items-center mt-12 text-3xl bg-gray-100">
            <div className="text-4xl p-8 ">Reviews and ratings</div>
            <div className="text-sm p-8 text-gray-500">
              No reviews to display
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;

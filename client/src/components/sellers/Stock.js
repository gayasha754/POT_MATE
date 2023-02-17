import SellerSideBar from "./SellerSideBar";
import NavBar from "../NavBar";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GET_STOCK_URL = "sellers/getstock";

const Stock = () => {
  const [stock, setStock] = useState();

  const { auth } = useAuth();
  

  useEffect(() => {
    axios.post(GET_STOCK_URL).then((response) => {
      if (response.data.error) {
        console.log(`${response.data.error}`);
      } else {
        setStock(response.data.stock);
        console.log(response.data.stock);
      }
    });
  }, []);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Stock Details", 90, 10);
    doc.autoTable({
      body: stock,
    });
    doc.save("stock_table.pdf");
  };

  const editOnClickHandle = () => {
    // window.alert('aakj')
  }

  return (
    <>
      <NavBar />
      <main className="grid grid-cols-5">
        <div className="col-span-1" aria-label="Sidebar">
          <SellerSideBar />
        </div>
        <section className="col-span-4">
          <div className="flex flex-raw justify-end">
            <Link
              to="/sellers/stock/addstock"
              className="mr-16 mt-8 rounded-lg px-6 text-lg py-3 bg-blue-500 text-white font-semibold"
              type="button"
            >
              + Add Stock
            </Link>
          </div>
          <div className="flex mt-8 mb-10">
            <div className="flex flex-col text-gray-700 font-bold text-3xl mt-7 ml-14 mb-7">
              Pot Mate Stock
            </div>
          </div>
          <div className="flex flex-raw justify-end mr-16">
            <button
              onClick={() => downloadPdf()}
              type="submit"
              className="text-white bg-gray-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Download
            </button>
          </div>

          {stock?.length === 0 && (
            <>
              <div className="flex justify-center ml-8 mr-8 mt-5 px-3 py-10 bg-gray-100">
                <p className="text-lg text-gray-300">No items to Display</p>
              </div>
            </>
          )}
          <div class="grid grid-cols-5 text-center m-8 mt-0 shadow-md rounded-md">
            <div class="flex justify-center font-medium items-center w-full h-24">
              ProductId
            </div>
            <div class="flex justify-center font-medium items-center w-full h-24">
              ProductName
            </div>
            <div class="flex justify-center font-medium items-center w-full h-24 text-gray-500">
              Amount
            </div>
            <div class="flex justify-center font-medium items-center w-full h-24 text-gray-500">
              Date
            </div>
            <div class="flex justify-center font-medium items-center w-full h-24 text-gray-500"></div>
          </div>
          {stock?.map((item) => {
            return (
              <div key={item.stockId}>
                <div class="grid grid-cols-5 text-center m-8 mt-0 shadow-md rounded-md">
                  <div class="flex justify-center font-medium items-center w-full h-24">
                    {item.productId}
                  </div>
                  <div class="flex justify-center font-medium items-center w-full h-24">
                    {item.productName}
                  </div>
                  <div class="flex justify-center font-medium items-center w-full h-24">
                    {item.Amount}
                  </div>
                  <div class="flex justify-center font-medium items-center w-full h-24 text-gray-500">
                    {item.Date}
                  </div>
                  <div class="flex justify-center font-medium items-center w-full h-24 text-gray-500">
                    <button class="border-2 border-gray-200 hover:bg-gray-500 hover:text-white p-2" onClick={editOnClickHandle} >
                    <Link to={`/sellers/updatestock/${item.stockId}`} >
                        Edit
                      </Link>
                    </button>
                    <button class="border-2 border-gray-200 hover:bg-gray-500 hover:text-white p-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Stock;


import React , { useState, useEffect }from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const AnnualSalesData = () => {

  const { auth } = useAuth();
  const [chartData, setChartData] = useState();
  const GET_CHART_DATA_URL = "sellers/getannualsalesdata";
  let arr;
  useEffect(() => {
    // 
        axios.post(GET_CHART_DATA_URL).then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            arr= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
            const data = response.data.request;
    
            for (let i = 0; i < data.length; i++) {
              if (data[i].month == "January") {
                arr[0] = data[i].sales;
              } else if (data[i].month == "February") {
                arr[1] = data[i].sales;
              } else if (data[i].month == "March") {
                arr[2] = data[i].sales;
              } else if (data[i].month == "April") {
                arr[3] = data[i].sales;
              } else if (data[i].month == "May") {
                arr[4] = data[i].sales;
              } else if (data[i].month == "June") {
                arr[5] = data[i].sales;
              } else if (data[i].month == "July") {
                arr[6] = data[i].sales;
              } else if (data[i].month == "August") {
                arr[7] = data[i].sales;
              } else if (data[i].month == "September") {
                arr[8] = data[i].sales;
              } else if (data[i].month == "October") {
                arr[9] = data[i].sales;
              } else if (data[i].month == "November") {
                arr[10] = data[i].sales;
              } else if (data[i].month == "December") {
                arr[11] = data[i].sales;
              }
            }
            console.log("arr: " ,arr);
            setChartData(arr);
            console.log(response.data.request);
          }
        });
      }, []);
      
  const labels = [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales - Rs.",
        backgroundColor: [
                    "#f97316",
                    "#1f2937",
                    "#C38B2C",
                    "#f97316",
                    "#1f2937",
                    "#C38B2C",
                    "#f97316",
                    "#1f2937",
                    "#C38B2C",
                    "#f97316",
                    "#1f2937",
                    "#C38B2C",
                  ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        data: chartData,
      },
    ],
  };
  return (
    
    <div>
      <Bar data={data} />
    </div>
  );
};

export default AnnualSalesData;
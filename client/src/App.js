import "./App.css";
import Home from "./components/buyers/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./components/buyers/Register";
import Login from "./components/buyers/Login";
import SellerLogin from "./components/sellers/SellerLogin";
import Dashboard from "./components/sellers/Dashboard";
import Stock from "./components/sellers/Stock";
import Orders from "./components/sellers/Orders";
import Customers from "./components/sellers/Customers";
import Reports from "./components/sellers/Reports";
import SalesForecast from "./components/sellers/SalesForecast";
import CustomizeOrder from "./components/sellers/CustomizeOrders";
import Settings from "./components/sellers/settings";
import Addstock from "./components/sellers/AddStock";
import Products from "./components/Products";
import SellerProducts from "./components/sellers/SellerProducts";
import AddProduct from "./components/sellers/AddProduct";
import ProductView from "./components/ProductView";
import CartView from "./components/CartView";
import CheckoutSuccess from "./components/buyers/CheckoutSuccess";
import AddOrder from "./components/sellers/AddOrder";
import AddCustomizedOrder from "./components/sellers/AddCustomizeOrder";
import AddCustomer from "./components/sellers/AddCustomer";
import CustomizePotForm from "./components/buyers/CustomizePotForm";
import Profile from "./components/buyers/Profile";
import Products_CategorizedPots from "./components/Products_CategorizedPots";
import Products_Plants from "./components/Products_Plants";
import Products_GardenTools from "./components/Products_GardenTools";
import Products_PotMates from "./components/Products_PotMates";
import NotFound from "./components/NotFound";
import SellerOrders from "./components/sellers/SellerOrders";
import SellerOrdersCompleted from "./components/sellers/SellerOrdersCompleted";
import SellerOrdersShipped from "./components/sellers/SellerOrdersShipped";
import BuyerOrders from "./components/buyers/BuyerOrders";
import BuyerOrdersCompleted from "./components/buyers/BuyerOrdersCompleted";
import AddRating from "./components/buyers/AddRating";

import UpdateProduct from "./components/sellers/UpdateProduct";
import UpdateStock from "./components/sellers/UpdateStock";
import UpdateCustomer from "./components/sellers/Updatecustomer";


function App() {
  return (
    /* colorcode 
    bg-lime-300
    bg-green-500
    bg-teal-400		
     */
    <Routes>
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sellers/login" element={<SellerLogin />} />
      <Route path="/products" element={<Products />} />
      <Route path="/potmateproducts" element={<Products_PotMates />} />
      <Route
        path="/categorizedproducts"
        element={<Products_CategorizedPots />}
      />
      <Route path="/gardentoolsproducts" element={<Products_GardenTools />} />
      <Route path="/plantproducts" element={<Products_Plants />} />

      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/buyers/checkout-success" element={<CheckoutSuccess />} />
      <Route path="CustomizePotForm" element={<CustomizePotForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/buyers/orders" element={<BuyerOrders />} />
      <Route
        path="/buyers/orders/completed"
        element={<BuyerOrdersCompleted />}
      />
      <Route path="/buyers/order/review/:id" element={<AddRating />} />

      {/* Seller Protected Routes */}

      <Route path="/sellers/profile" element={<Dashboard />} />
      <Route path="/sellers/profile/listings/" element={<Stock />} />
      <Route path="/sellers/profile/orders" element={<Orders />} />
      <Route
        path="/sellers/profile/customizedorders"
        element={<CustomizeOrder />}
      />
      <Route
        path="/sellers/profile/sellerProducts/"
        element={<SellerProducts />}
      />

      <Route path="/sellers/profile/customers" element={<Customers />} />
      <Route path="/sellers/profile/reports" element={<Reports />} />

      <Route
        path="/sellers/profile/reports/sales/:type/:from/:to"
        element={<SalesForecast />}
      />
      <Route path="/sellers/order/addorder" element={<AddOrder />} />
      <Route
        path="/sellers/customizedorder/addcustomizeorder"
        element={<AddCustomizedOrder />}
      />
      <Route path="/sellers/customers/addcustomer" element={<AddCustomer />} />

      <Route path="/sellers/profile/settings" element={<Settings />} />
      <Route path="/sellers/products/addproduct" element={<AddProduct />} />
      <Route path="/sellers/stock/addstock" element={<Addstock />} />

      <Route
        path="/sellers/products/updateproduct/:id"
        element={<UpdateProduct />}
      />
      <Route path="/sellers/updatestock/:id" element={<UpdateStock />} />
      <Route path="/sellers/Updatecustomer" element={<UpdateCustomer />} />
      <Route path="/sellers/orders/" element={<SellerOrders />} />
      <Route path="/sellers/orders/shipped" element={<SellerOrdersShipped />} />
      <Route
        path="/sellers/orders/completed"
        element={<SellerOrdersCompleted />}
      />
    </Routes>
  );
}

export default App;

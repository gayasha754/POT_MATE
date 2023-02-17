import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cartItems: [],
    count: 0,
    subTotal: 0,
    discount: 0,
    total: 0,
  });

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

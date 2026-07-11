"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, cartLoaded]);
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product_id === product.product_id);
      if (exist) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (product_id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== product_id));
  };
  const updateQuantity = (product_id, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    );
  };
  const total = cart.reduce((sum, item) => {
    let itemPrice = Number(item.price);

    if (Number(item.sale_price) > 0 && Number(item.sale_price) < itemPrice) {
      itemPrice = Number(item.sale_price);
    }

    return sum + itemPrice * item.quantity;
  }, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{ setCart, cart, addToCart, removeFromCart, updateQuantity, total, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);

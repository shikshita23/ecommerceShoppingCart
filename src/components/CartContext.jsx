import { createContext, useEffect, useState } from "react";
import { deleteCartFn, getCartFn, updateCartFn } from "../api/ApiHandler";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
     const [cartItems, setCartItems] = useState([])
     const fetchData = async () => {
          try {
               setCartItems(await getCartFn());
          }
          catch (error) {
               console.log(error);
          }
     }
     useEffect(() => {
          fetchData();
     }, [])
     const handleQuantityUpdate = async (productId, newQuantity) => {
          if (newQuantity < 1) return;
          try {
               const itemToUpdate = cartItems.find(item => item.productId === productId);
               if (!itemToUpdate) return;
               const updateItem = { ...itemToUpdate, quantity: newQuantity };
               await updateCartFn(itemToUpdate.id, updateItem);
               setCartItems((prevItems) =>
                    prevItems.map((item) =>
                         item.productId === productId ? updateItem : item
                    )
               );
          } catch (error) {
               console.error("Update error:", error.response ? error.response.data : error.message);
          }
     }
     const handleDelete = async (productId) => {
          try {
               await deleteCartFn(productId);
               setCartItems(prevItems =>
                    prevItems.filter(item => item.productId !== productId)
               );

          }
          catch (error) {
               console.log(error);
          }
     }
     const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
     const totalItem = cartItems.reduce((total, item) => total + item.quantity, 0);
     return (
          <CartContext.Provider value={{ cartItems, totalPrice, handleQuantityUpdate, handleDelete, totalItem }}>{children}</CartContext.Provider>
     )
}

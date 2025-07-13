import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [], // { id, name, price, image, section, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id && item.section === action.payload.section
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id && item.section === action.payload.section
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.section === action.payload.section)
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.section === action.payload.section
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (item) => dispatch({ type: "REMOVE_ITEM", payload: item });
  const updateQuantity = (item, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { ...item, quantity } });

  return (
    <CartContext.Provider value={{ cart: state, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 
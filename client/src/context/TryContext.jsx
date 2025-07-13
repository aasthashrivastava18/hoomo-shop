import React, { createContext, useContext, useState } from "react";

const TryContext = createContext();

export function TryProvider({ children }) {
  const [tryItems, setTryItems] = useState([]);
  const MAX_TRY = 4;

  const addTryItem = (item) => {
    if (tryItems.find((i) => i._id === item._id)) return;
    if (tryItems.length >= MAX_TRY) return false;
    setTryItems([...tryItems, item]);
    return true;
  };

  const removeTryItem = (id) => {
    setTryItems(tryItems.filter((i) => i._id !== id));
  };

  const clearTryItems = () => setTryItems([]);

  return (
    <TryContext.Provider value={{ tryItems, addTryItem, removeTryItem, clearTryItems, MAX_TRY }}>
      {children}
    </TryContext.Provider>
  );
}

export function useTry() {
  return useContext(TryContext);
} 
import { createContext, useState } from "react";

export const productsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [allSelectedProducts, setAllSelectedProducts] = useState([{}]);
  return (
    <productsContext.Provider
      value={{ allSelectedProducts, setAllSelectedProducts }}
    >
      {children}
    </productsContext.Provider>
  );
};

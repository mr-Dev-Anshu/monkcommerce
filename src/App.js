import React from "react";
import AddProducts from "./components/AddProducts";
import { ProductsContextProvider } from "./context/product.context";
import { ChakraProvider } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import HeroSection from "./components/HeroSection";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <ChakraProvider>
      <ProductsContextProvider>
        <Navbar/>
        <div className=" mt-7 ">
          <div className="flex justify-center  ">
            <HeroSection />
          </div>
          <main className="App-main">
            <AddProducts />
          </main>
        </div>
      </ProductsContextProvider>
    </ChakraProvider>
  );
}

export default App;

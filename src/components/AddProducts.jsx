import React, { useContext,  useState } from "react";
import { SelectProducts } from "./SelectProducts";
import { productsContext } from "../context/product.context";
import { ImCross } from "react-icons/im";
import { RiGridFill } from "react-icons/ri";
import Discount from "./Discount";
const AddProducts = () => {
  const [addProduct, setAddProduct] = useState([{ value: "" }]);
  const [message, setMessage] = useState();
  const [discount, setDiscount] = useState(false);

  const { allSelectedProducts, setAllSelectedProducts } =
    useContext(productsContext);

  const handleDiscount = (index) => {
    setDiscount(index);
  };

  const handleAddProduct = () => {
    if (allSelectedProducts.length === 4) {
      setMessage("You can't add More products");
      return;
    }
    setAllSelectedProducts((prev) => [...prev, {}]);
    console.log("Clicked");
  };
  const handleInputChange = (index, value) => {
    const newAddProduct = [...addProduct];
    newAddProduct[index].value = value;
    setAddProduct(newAddProduct);
    console.log(newAddProduct);
  };

  const handleDelete = (variant, index) => {
    setAllSelectedProducts((prev) => {
      const newProducts = [...prev];
      const newVariants = newProducts[index].variants.filter(
        (v) => v !== variant
      );
      if (newVariants.length === 0) {
        newProducts.splice(index, 1);
      } else {
        newProducts[index].variants = newVariants;
      }
      return newProducts;
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center  justify-center gap-6 mt-9 ">
        {allSelectedProducts.map((item, index) => (
          <>
            {" "}
            <div
              key={index}
              className="w-full grid grid-cols-3 gap-2 md:w-[50%]"
            >
              <div className="md:col-span-2 flex">
                <span className="text-xl  mx-2  flex items-center">
                  {<RiGridFill />}
                </span>
                <span className="text-xl  mx-2  flex items-center">
                  {index + 1}.
                </span>
                <input
                  className="p-3 bg-white border-t border-b border-l rounded-l-md border-gray-300 focus:outline-none w-full"
                  placeholder="Add Products here"
                  type="text"
                  value={allSelectedProducts[index].product_name}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <span className="flex items-center border-t border-b border-r px-2 border-gray-300 cursor-pointer">
                  <SelectProducts />
                </span>
              </div>
              {discount === index  ? (
                <div className="flex items-center gap-2 ">
                  <Discount />
                  <span className="cursor-pointer" onClick={()=>handleDiscount(null)}>
                    {" "}
                    <ImCross />
                  </span>
                </div>
              ) : (
                <div
                  onClick={ ()=>handleDiscount(index)}
                  className="bg-[#007555] text-white cursor-pointer col-span-1 md:px-12 flex items-center justify-center rounded-md"
                >
                  Add Discount
                </div>
              )}
            </div>
            {allSelectedProducts[index].variants?.map((item, i) => (
              <div key={i} className="md:w-[40%] flex items-center gap-4  ">
                <span className="border w-[90%] border-gray-400 rounded-lg px-4 py-2">
                  {item}
                </span>
                <span
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleDelete(item, index)}
                >
                  {<ImCross size={20} />}{" "}
                </span>
              </div>
            ))}
          </>
        ))}
      </div>
      <div className="flex justify-end md:mx-[330px] md:mt-4">
        <span
          onClick={handleAddProduct}
          className="px-16 py-3 border-2 border-[#007555] cursor-pointer font-semibold"
        >
          Add Products
        </span>
      </div>
      <div className="flex justify-center text-red-600 ">{message}</div>
    </div>
  );
};

export default AddProducts;

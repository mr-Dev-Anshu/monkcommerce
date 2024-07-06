import React from "react";
import { ImCross } from "react-icons/im";

const Discount = () => {
  return (
    <div>
      <div className="flex items-center gap-2 ">
        <input
          className="p-3 bg-white w-20 font-semibold border rounded-md border-gray-300 focus:outline-none"
          type="number"
          defaultValue={0}
          placeholder="0"
        />
        <select className="p-3 text-sm bg-white w-30 font-semibold border rounded-md border-gray-300 focus:outline-none" name="" id="">
           <option value="%Off">% Off</option>
           <option value="">Flat Off </option>
        </select>
      </div>
    </div>
  );
};

export default Discount;

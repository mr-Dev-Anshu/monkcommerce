import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { HiViewGridAdd } from "react-icons/hi";
import React, { useContext, useState } from "react";
import { productsContext } from "../context/product.context";
import { MdEdit } from "react-icons/md";
import { products } from "../constant/productsData";


export const SelectProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { setAllSelectedProducts, allSelectedProducts } =
    useContext(productsContext);
  const [selectedProducts, setSelectedProduct] = useState([]);
  const [search, setSearch] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterProducts = (products, search) => {
    if (!search) return products;
    const lowerCaseSearch = search.toLowerCase();
    return products.filter((product) => {
      const productMatches = product.product_name
        .toLowerCase()
        .includes(lowerCaseSearch);
      const variantsMatch = product.variants.some((variant) =>
        variant.variant_name.toLowerCase().includes(lowerCaseSearch)
      );
      return productMatches || variantsMatch;
    });
  };
  const handleProductChange = (product_id, isChecked) => {
    setSelectedProduct((prev) => {
      if (isChecked) {
        const product = products.find((p) => p.product_id === product_id);
        const variants = product.variants.map(
          (variant) => variant.variant_name
        );
        return [
          ...prev,
          { product_id, product_name: product.product_name, variants },
        ];
      } else {
        return prev.filter((p) => p.product_id !== product_id);
      }
    });
    console.log(allSelectedProducts);
  };

  const handleVariantChange = (product_id, variant_name, isChecked) => {
    setSelectedProduct((prev) => {
      const productIndex = prev.findIndex((p) => p.product_id === product_id);
      if (productIndex > -1) {
        const newVariants = isChecked
          ? [...prev[productIndex].variants, variant_name]
          : prev[productIndex].variants.filter((name) => name !== variant_name);
        if (newVariants.length === 0) {
          return prev.filter((p) => p.product_id !== product_id);
        } else {
          const newProducts = [...prev];
          newProducts[productIndex].variants = newVariants;
          return newProducts;
        }
      } else {
        const product = products.find((p) => p.product_id === product_id);
        return [
          ...prev,
          {
            product_id,
            product_name: product.product_name,
            variants: [variant_name],
          },
        ];
      }
    });
    console.log(selectedProducts);
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        {<MdEdit size={20} />}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="border-b border-gray-300">
            <div className="flex items-center gap-2">
              <HiViewGridAdd />
              Add Product
            </div>
          </DrawerHeader>
          <DrawerBody>
            <Input placeholder="Search Products " onChange={handleChange} />
            {filterProducts(products, search).map((product) => (
              <div
                className="border-b border-gray-300"
                key={product.product_id}
              >
                <div>
                  <Checkbox
                    isChecked={selectedProducts.some(
                      (p) => p.product_id === product.product_id
                    )}
                    onChange={(e) =>
                      handleProductChange(product.product_id, e.target.checked)
                    }
                  >
                    <div className="flex items-center">
                      <span>
                        <img
                          className="w-14 h-14"
                          src={product.product_image}
                          alt="asdfasdf"
                        />
                      </span>
                      <span className="text-xl font-semibold">
                        {product.product_name}
                      </span>
                    </div>
                  </Checkbox>
                </div>
                <div className="px-6">
                  {product.variants.map((item) => (
                    <div key={item.variant_id}>
                      <Checkbox
                        className="text-2xl font-semibold"
                        isChecked={selectedProducts.some(
                          (p) =>
                            p.product_id === product.product_id &&
                            p.variants.includes(item.variant_name)
                        )}
                        onChange={(e) =>
                          handleVariantChange(
                            product.product_id,
                            item.variant_name,
                            e.target.checked
                          )
                        }
                      >
                        {item.variant_name}
                        <span className="text-xl font-semibold">
                          $ {item.variant_price}
                        </span>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedProducts.length > 4) {
                  alert("You can't add more than 4 products ");
                  return;
                }

                setAllSelectedProducts((prev) => {
                  return prev.filter((p) => p.product_name !== undefined);
                });

                setAllSelectedProducts((prev) => {
                  console.log("asdfasd", prev, selectedProducts);

                  const filteredSelectedProducts = selectedProducts.filter(
                    (selectedProduct) => {
                      return !prev.some(
                        (existingProduct) =>
                          existingProduct.product_id ===
                          selectedProduct.product_id
                      );
                    }
                  );

                  return [...prev, ...filteredSelectedProducts];
                });

                onClose();
              }}
              colorScheme="blue"
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

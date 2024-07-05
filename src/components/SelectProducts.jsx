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
} from "@chakra-ui/react";
import { HiViewGridAdd } from "react-icons/hi";
import React, { useContext, useState } from "react";
import { productsContext } from "../context/product.context";
import { MdEdit } from "react-icons/md";
export const SelectProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const products = [
    {
      product_id: 1,
      product_name: "Fog Linen Chambray Towel - Beige Stripe",
      product_image:
        "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
      variants: [
        {
          variant_id: 1,
          variant_name: "XS / Silver",
          variant_price: "49",
        },
        {
          variant_id: 2,
          variant_name: "S / Silver",
          variant_price: "49",
        },
        {
          variant_id: 3,
          variant_name: "M / Silver",
          variant_price: "49",
        },
      ],
    },
    {
      product_id: 2,
      product_name: "Orbit Terrarium - Large",
      product_image:
        "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
      variants: [
        {
          variant_id: 4,
          variant_name: "Default Title",
          variant_price: "109",
        },
      ],
    },
  ];

  const { setAllSelectedProducts, allSelectedProducts } =
    useContext(productsContext);

  const [selectedProducts, setSelectedProduct] = useState([]);
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

  const handleVariantChange = (product_id, variant_id, isChecked) => {
    setSelectedProduct((prev) => {
      const productIndex = prev.findIndex((p) => p.product_id === product_id);
      if (productIndex > -1) {
        const newVariants = isChecked
          ? [...prev[productIndex].variants, variant_id]
          : prev[productIndex].variants.filter((id) => id !== variant_id);
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
            variants: [variant_id],
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
            {products.map((product) => (
              <div
                className="border-b border-gray-300 "
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
                    {" "}
                    <div className="flex items-center ">
                      <span className=" ">
                        <img
                          className="w-14"
                          src={product.product_image}
                          alt="image"
                        />
                      </span>
                      <span className="text-xl font-semibold">
                        {" "}
                        {product.product_name}
                      </span>
                    </div>
                  </Checkbox>
                </div>
                <div className="px-6">
                  {product.variants.map((item) => (
                    <div key={item.variant_id}>
                      <Checkbox
                        className="text-2xl font-semibold "
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
                        {item.variant_name}{" "}
                        <span className="text-xl font-semibold ">
                          {" "}
                          $ {item.variant_price}{" "}
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

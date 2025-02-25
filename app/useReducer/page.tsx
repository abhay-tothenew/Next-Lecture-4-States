"use client";

import { useEffect, useReducer, useState } from "react";

const initialState = {
  products: [],
  loading: true,
  error: null,
};

interface Product {
  id: number;
  title: string;
  price: number;
}
interface State {
  products: Product[];
  loading: boolean;
  error: any;
}

interface Action {
  type: "getProducts" | "addProducts" | "removeProducts";
  payload: any;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "getProducts":
      return { ...state, products: action.payload, loading: false };

    case "addProducts":
      return { ...state, products: [...state.products, action.payload] };

    case "removeProducts":
      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        dispatch({
          type: "getProducts",
          payload: data.products.slice(0, 10),
        });
      } catch (err) {
        alert("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (product: Product) => {
    dispatch({
      type: "addProducts",
      payload: product,
    });
  };

  const removeProduct = (id: number) => {
    dispatch({
      type: "removeProducts",
      payload: id,
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center border-b-2">UseReducer Hook Usage</h1>

      {state.loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <ul className="space-y-3">
            {state.products.map((product: Product) => (
              <li
                key={product.id}
                className="border p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />
        <input
          type="number"
          placeholder="Enter Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(parseInt(e.target.value))}
          className="border p-2 rounded-md w-full mb-2"
        />
        <button
          onClick={() =>
            addProduct({
              id: Math.floor(Math.random() * 1000),
              title: productName,
              price: productPrice,
            })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

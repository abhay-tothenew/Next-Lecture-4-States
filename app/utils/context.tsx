"use client";
import { createContext, use, useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}
interface DataContextType {
  products: Product[];
  loading: boolean;
  error: string;
}

const DataContext = createContext<DataContextType>({
  products: [],
  loading: true,
  error: "",
});

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setData(data.products);
        setLoading(false);
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // console.log("DataProvider", data);

  return (
    <DataContext.Provider value={{ products: data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}


export { DataContext };

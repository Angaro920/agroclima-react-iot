import React, { createContext, useContext, useEffect, useState } from "react";
import useGetESP32Data from "../hooks/useGetESP32Data";

const initialData = { currentTemperature: 0 };
const DataContext = createContext(initialData);

export const DataProvider = ({ children }: any) => {
  const { data } = useGetESP32Data();
  const [currentData, setCurrentData] = useState({
    temperature: {value:0, unit:"°C"}, // Puedes cambiar a 'Fahrenheit' según sea necesario
  });
  
  useEffect(()=>{setCurrentTemperature({...currentTemperature, value: data.temperatura})},[data])

  return (
    <DataContext.Provider value={{ currentTemperature, setCurrentTemperature }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("la kge :C");
  }
  return context;
};

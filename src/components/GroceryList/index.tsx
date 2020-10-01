import React, { useState } from "react";
import { Grocery } from "../../types/Grocery";
import GroceryItem from "../GroceryItem";

interface GroceryListProps {
  data: Grocery[];
}

const GroceryList: React.FC<GroceryListProps> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <GroceryItem key={index} item={item} />
      ))}
    </>
  );
};

export default GroceryList;

import React from "react";
import ProductCard from "../components/ProductCard";

export default function Dashboard({
  products = [],
  addToCart,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {products
        .filter(
          (product) =>
            product &&
            typeof product === "object"
        )
        .map((product, index) => (
          <ProductCard
            key={product.id || index}
            product={product}
            addToCart={addToCart}
          />
        ))}
    </div>
  );
}
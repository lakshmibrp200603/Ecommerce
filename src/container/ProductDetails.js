import React,
{
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  getSingleProduct
} from "../Services/productService";


export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    const fetchProduct =
      async () => {

      try {

        const data =
          await getSingleProduct(id);

        setProduct(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchProduct();

  }, [id]);

  if (!product) {

    return <h1>Loading...</h1>;
  }

  return (

    <div
      style={{
        padding: "40px",
        textAlign: "center"
      }}
    >

      <img
        src={product.image}
        alt={product.title}

        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain"
        }}
      />

      <h1>
        {product.title}
      </h1>

      <h2>
        ₹ {product.price}
      </h2>

      <p>
        {product.description}
      </p>

    </div>
  );
}
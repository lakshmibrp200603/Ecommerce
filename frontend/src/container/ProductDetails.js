import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../Services/productService";


export default function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);


  useEffect(() => {

    async function fetchProduct() {

      try {

        const data = await getSingleProduct(id);
        setProduct(data);

      } catch (error) {

        console.log(error);

      }

    }


    fetchProduct();

  }, [id]);



  // Add To Cart (No Rating / No Review)
  const addToCart = (product) => {


    const existingProduct = cart.find(
      (item) => item.id === product.id
    );



    if (existingProduct) {


      const updatedCart = cart.map((item) =>

        item.id === product.id

        ?

        {
          ...item,
          qty: (item.qty || 1) + 1,
        }

        :

        item

      );


      setCart(updatedCart);



    } else {



      setCart([

        ...cart,

        {

          id: product.id,

          title: product.title,

          image: product.image,

          price: product.price,

          qty: 1

        }

      ]);



    }


    alert("Added to Cart");

  };





  if (!product) {

    return <h2>Loading...</h2>;

  }




  return (

    <div style={{ padding:"40px" }}>


      {/* Back Button */}
      <button

        onClick={() => navigate(-1)}

        style={{

          background:"#ff5722",

          color:"#fff",

          border:"none",

          padding:"10px 18px",

          borderRadius:"8px",

          cursor:"pointer",

          marginBottom:"20px"

        }}

      >

        ⬅ Back

      </button>




      {/* Product Card */}

      <div

        style={{

          maxWidth:"700px",

          margin:"auto",

          background:"#fff",

          padding:"30px",

          borderRadius:"12px",

          boxShadow:"0 2px 10px rgba(0,0,0,0.1)"

        }}

      >



        <div style={{textAlign:"center"}}>


          <img

            src={product.image}

            alt={product.title}

            style={{

              width:"300px",

              height:"300px",

              objectFit:"contain"

            }}

          />


        </div>





        <h1>

          {product.title}

        </h1>





        <h2 style={{color:"green"}}>

          ₹ {product.price}

        </h2>





        <p>

          {product.description}

        </p>





        <button

          onClick={() => addToCart(product)}

          style={{

            marginTop:"20px",

            padding:"12px 25px",

            background:"#28a745",

            color:"#fff",

            border:"none",

            borderRadius:"8px",

            cursor:"pointer",

            fontWeight:"bold",

            fontSize:"16px"

          }}

        >

          🛒 Add To Cart

        </button>



      </div>


    </div>

  );

}
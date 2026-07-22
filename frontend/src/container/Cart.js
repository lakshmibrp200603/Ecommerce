import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase";

export default function Cart({ cart = [], setCart }) {

  const navigate = useNavigate();

  const [ratings, setRatings] = useState({});


  // Get Product Ratings
  useEffect(() => {

    const getRatings = async () => {

      const { data, error } = await supabase
        .from("reviews")
        .select("product_id, rating");


      if(error){

        console.log("Rating Fetch Error:", error);
        return;

      }


      const ratingData = {};


      data.forEach((item)=>{

        ratingData[item.product_id] = item.rating;

      });


      setRatings(ratingData);

    };


    getRatings();


  }, []);



  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );



  const removeFromCart = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    );

  };



  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );

  };



  const decreaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                (item.qty || 1) > 1
                ? (item.qty || 1) - 1
                : 1,
            }
          : item
      )
    );

  };



  const handleBuyNow = () => {

    if(cart.length === 0){

      alert("Cart is Empty");
      return;

    }


    const currentUser = JSON.parse(
      localStorage.getItem("user")
    );


    if(!currentUser){

      alert("Please Login First");
      navigate("/");
      return;

    }


    navigate("/checkout");

  };





  return (

    <div
      style={{
        padding:"20px",
        fontFamily:"Arial"
      }}
    >


      <button

        onClick={()=>navigate(-1)}

        style={{
          marginBottom:"15px",
          padding:"8px 14px",
          backgroundColor:"#a1a09f",
          color:"white",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer"
        }}

      >

        ⬅ Back

      </button>



      <h2>
        My Cart
      </h2>



      {
        cart.length === 0 ? (

          <h3>
            Cart is Empty
          </h3>

        ) : (


        <>


        {
          cart.map((item)=>(


            <div

              key={item.id}

              style={{
                display:"flex",
                gap:"20px",
                padding:"15px",
                marginBottom:"15px",
                borderRadius:"10px",
                alignItems:"center",
                border:"1px solid #ddd"
              }}

            >



              <img

                src={item.image}

                alt={item.title}

                style={{
                  width:"100px",
                  height:"100px",
                  objectFit:"contain"
                }}

              />




              <div
                style={{
                  flex:1
                }}
              >



                <h3>
                  {item.title}
                </h3>



                {/* CUSTOMER RATING ONLY */}

                {
                  ratings[item.id] &&

                  <div

                    style={{
                      color:"#f5a623",
                      fontSize:"18px",
                      marginBottom:"8px"
                    }}

                  >

                    ⭐ {ratings[item.id]}/5

                  </div>

                }




                <p

                  style={{
                    color:"green",
                    fontWeight:"bold"
                  }}

                >

                  ₹ {(item.price * (item.qty || 1)).toFixed(2)}

                </p>




                <div

                  style={{
                    display:"flex",
                    gap:"10px",
                    alignItems:"center"
                  }}

                >


                  <button
                    onClick={()=>decreaseQty(item.id)}
                  >
                    -
                  </button>



                  <span>
                    {item.qty || 1}
                  </span>



                  <button
                    onClick={()=>increaseQty(item.id)}
                  >
                    +
                  </button>


                </div>





                <button

                  onClick={()=>removeFromCart(item.id)}

                  style={{
                    marginTop:"10px",
                    background:"red",
                    color:"#fff",
                    border:"none",
                    padding:"6px 12px",
                    borderRadius:"5px",
                    cursor:"pointer"
                  }}

                >

                  Remove

                </button>



              </div>


            </div>


          ))
        }




        <h3
          style={{
            color:"#044613"
          }}
        >

          Total: ₹ {totalAmount.toFixed(2)}

        </h3>





        <button

          onClick={handleBuyNow}

          style={{
            backgroundColor:"#08500e",
            color:"white",
            padding:"12px 24px",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
            fontWeight:"bold",
            fontSize:"16px"
          }}

        >

          Buy Now

        </button>



        </>


        )

      }



    </div>

  );

}
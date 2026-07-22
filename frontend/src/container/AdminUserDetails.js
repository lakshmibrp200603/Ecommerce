import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase";

export default function AdminUserDetails() {

  const { email } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchUser = useCallback(async () => {

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();


    console.log("Email from URL:", email);
    console.log("User Data:", data);
    console.log("User Error:", error);


    if(error){

      console.log(error.message);
      setUser(null);

    }
    else{

      setUser(data);

    }

    setLoading(false);


  }, [email]);





  const fetchOrders = useCallback(async () => {


    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", email);



    console.log("Orders Data:", data);
    console.log("Orders Error:", error);



    if(error){

      setOrders([]);

    }
    else{

      setOrders(data || []);

    }


  }, [email]);





  useEffect(() => {


    if(email){

      fetchUser();
      fetchOrders();

    }


  }, [email, fetchUser, fetchOrders]);







  if(loading){

    return (

      <h2 style={{padding:"20px"}}>
        Loading...
      </h2>

    );

  }






  return (

    <div style={{padding:"20px"}}>


      <button 
        onClick={()=>navigate(-1)}
        style={{
          padding:"8px 15px",
          cursor:"pointer"
        }}
      >
        ⬅ Back
      </button>



      <h2>
        👤 User Details
      </h2>





      {
        user ? (

          <div
            style={{
              border:"1px solid #ddd",
              padding:"20px",
              borderRadius:"10px",
              marginBottom:"25px"
            }}
          >


            <p>
              <b>User ID:</b> {user.id}
            </p>


            <p>
              <b>Name:</b> {user.name || "Not Available"}
            </p>


            <p>
              <b>Email:</b> {user.email}
            </p>


            <p>
              <b>Phone:</b> {user.phone || "Not Available"}
            </p>


            <p>
              <b>Address:</b> {user.address || "Not Available"}
            </p>


          </div>


        )

        :

        (

          <p>
            User not found
          </p>

        )

      }





      <h3>
         Orders
      </h3>





      {
        orders.length === 0 ?


        (

          <p>
            No Orders Found
          </p>


        )


        :


        (

          orders.map((o)=>(


            <div
              key={o.id}
              style={{
                border:"1px solid #ddd",
                padding:"15px",
                marginTop:"15px",
                borderRadius:"8px"
              }}
            >


              {
                o.product_image &&

                <img
                  src={o.product_image}
                  alt={o.product_title}
                  style={{
                    width:"100px",
                    height:"100px",
                    objectFit:"contain"
                  }}
                />

              }





              <p>
                <b>Order ID:</b> {o.id}
              </p>


              <p>
                <b>User Email:</b> {o.user_email}
              </p>


              <p>
                <b>Product ID:</b> {o.product_id}
              </p>


              <p>
                <b>Product:</b> {o.product_title}
              </p>


              <p>
                <b>Price:</b> ₹{o.price}
              </p>


              <p>
                <b>Quantity:</b> {o.qty}
              </p>


              <p>
                <b>Total Amount:</b> ₹{o.price * o.qty}
              </p>


              <p>
                <b>Status:</b> {o.status}
              </p>


              <p>
                <b>Order Date:</b> 
                {" "}
                {o.created_at 
                  ? new Date(o.created_at).toLocaleString()
                  : "N/A"
                }
              </p>



            </div>


          ))


        )

      }




    </div>

  );

}
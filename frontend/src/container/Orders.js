import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Services/supabase";
import Review from "./Review";

export default function Orders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [ratingProduct, setRatingProduct] = useState(null);




  useEffect(() => {

    fetchOrders();


    const channel = supabase
      .channel("orders-status-update")
      .on(
        "postgres_changes",
        {
          event:"UPDATE",
          schema:"public",
          table:"orders",
        },
        (payload)=>{

          setOrders((prev)=>
            prev.map((order)=>
              order.id === payload.new.id
              ? payload.new
              : order
            )
          );

        }
      )
      .subscribe();



    return()=>{
      supabase.removeChannel(channel);
    }


  },[]);




  async function fetchOrders(){

    const currentUser =
    JSON.parse(localStorage.getItem("user"));


    if(!currentUser) return;


    const {data,error}=await supabase
    .from("orders")
    .select("*")
    .eq("user_email",currentUser.email)
    .order("created_at",{ascending:false});


    if(error){

      console.log(error);

    }
    else{

      setOrders(data);

    }

  }





  const getStatusColor=(status)=>{

    switch(status){

      case "Delivered":
        return "#28a745";

      case "Out for Delivery":
        return "#17a2b8";

      case "Shipped":
        return "#007bff";

      case "Packed":
        return "#fd7e14";

      case "Processing":
        return "#ffc107";

      case "Confirmed":
        return "#6f42c1";

      case "Cancelled":
        return "#dc3545";

      default:
        return "#777";

    }

  };





  return(

<div
style={{
maxWidth:"1200px",
margin:"30px auto",
padding:"20px"
}}
>


<button
onClick={()=>navigate(-1)}
style={{
padding:"10px 18px",
background:"#ff5722",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer",
marginBottom:"20px"
}}
>
⬅ Back
</button>



<h1>
My Orders
</h1>



{
orders.length===0 ?

<h3>No Orders Found</h3>


:

orders.map((item)=>(

<div key={item.id}>


<div

style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#fff",
padding:"20px",
borderRadius:"12px",
marginBottom:"15px",
boxShadow:"0 2px 10px rgba(0,0,0,0.1)"
}}

>



{/* LEFT */}

<div style={{width:"200px"}}>


<p>
<b>Order ID</b>
</p>

<p>
{item.id}
</p>



<p>
<b>Date</b>
</p>

<p>
{
new Date(item.created_at)
.toLocaleDateString()
}
</p>



<p>
<b>Total</b>
</p>

<p>
₹{item.price * item.qty}
</p>



<p>
<b>Status</b>
</p>


<span
style={{
background:getStatusColor(item.status),
color:"#fff",
padding:"6px 12px",
borderRadius:"20px"
}}
>
{item.status}
</span>


</div>





{/* CENTER */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"20px",
flex:1
}}
>


<img

src={item.product_image}

alt={item.product_title}

style={{
width:"110px",
height:"110px",
objectFit:"contain",
border:"1px solid #ddd",
borderRadius:"8px"
}}

/>



<div>

<h3>
{item.product_title}
</h3>


<p>
Quantity : {item.qty}
</p>


<p>
Price : ₹{item.price}
</p>


</div>


</div>






{/* RIGHT */}

<div
style={{
display:"flex",
flexDirection:"column",
gap:"12px"
}}
>


<button

onClick={()=>
navigate(`/order/${item.id}`)
}

style={{
background:"#1565c0",
color:"#fff",
border:"none",
padding:"12px 25px",
borderRadius:"8px",
cursor:"pointer"
}}

>

View Details

</button>




{
item.status==="Delivered" &&

<button

onClick={()=>
setRatingProduct(item)
}

style={{
background:"#28a745",
color:"#fff",
border:"none",
padding:"12px 25px",
borderRadius:"8px",
cursor:"pointer"
}}

>
{
item.status==="Delivered" &&

<Review
productId={item.product_id}
/>

}

</button>

}



</div>



</div>









</div>


))

}



</div>

  );

}
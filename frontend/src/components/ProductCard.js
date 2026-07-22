import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
      .some((item) => item.id === product?.id)
  );

  if (!product) return null;


  const toggleLike = (e) => {
    e.stopPropagation();

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item.id === product.id
    );


    if (exists) {

      const updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      setLiked(false);

    } else {

      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          ...wishlist,
          product
        ])
      );

      setLiked(true);
    }
  };


  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/product/${product.id}`)}
    >

      <div
        style={styles.heart}
        onClick={toggleLike}
      >
        {
          liked ?
          <FaHeart color="red" size={20}/> :
          <FaRegHeart color="#666" size={20}/>
        }
      </div>


      <div style={styles.imgBox}>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          style={styles.image}
        />
      </div>


      <h2 style={styles.title}>
        {product.title || "No title"}
      </h2>


      <h3 style={styles.price}>
        ₹ {product.price || 0}
      </h3>


      {/* Product rating */}
      <p style={styles.rating}>
        ⭐ {product.rating?.rate || product.rating || 0}
      </p>


    </div>
  );
}



const styles = {

  card:{
    width:"240px",
    background:"#fff",
    borderRadius:"14px",
    boxShadow:"0 2px 10px rgba(0,0,0,0.08)",
    padding:"12px",
    cursor:"pointer",
    position:"relative"
  },


  heart:{
    position:"absolute",
    top:"10px",
    right:"10px",
    background:"#fff",
    padding:"6px",
    borderRadius:"50%",
    boxShadow:"0 2px 6px rgba(0,0,0,0.1)",
    zIndex:1
  },


  imgBox:{
    width:"100%",
    height:"160px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },


  image:{
    maxWidth:"100%",
    maxHeight:"140px",
    objectFit:"contain"
  },


  title:{
    fontSize:"14px",
    minHeight:"38px",
    overflow:"hidden"
  },


  price:{
    color:"#e53935",
    fontWeight:"bold"
  },


  rating:{
    color:"#f5a623",
    fontWeight:"bold"
  }

};
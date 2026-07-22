import React, { useState } from "react";
import { supabase } from "../Services/supabase";
export default function Review({ productId }) {
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const submitReview = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // login check
    if (!user) {
      alert("Please login first");
      return;
    }
    // rating check
    if (rating === 0) {
      alert("Please select rating");
      return;
    }
    // review check
    if (!review.trim()) {
      alert("Please write your review");
      return;
    }
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          product_id: productId,
          user_email: user.email,
          rating: rating,
          review: review
        }
      ])
      .select();
    if (error) {
      console.log("Insert Error:", error);
      alert(error.message);
    } 
    else {
      console.log("Review Added:", data);
      alert("Review Submitted Successfully");
      setShowReview(false);
      setRating(0);
      setReview("");
    }
  };
  return (
    <>
      <button
        onClick={() => setShowReview(true)}
        style={{
          background:"#28a745",
          color:"#fff",
          border:"none",
          padding:"12px 25px",
          borderRadius:"8px",
          cursor:"pointer"
        }}
      >
        ⭐ Review
      </button>
      {
        showReview &&
        <div
          style={{
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            background:"rgba(0,0,0,0.5)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            zIndex:9999
          }}
        >
          <div
         style={{
              width:"420px",
              background:"#fff",
              borderRadius:"15px",
              padding:"25px"
            }}

          >
            <h2>
              ⭐ Rate Product
            </h2>
            <div
              style={{
                fontSize:"35px",
                margin:"20px 0"
              }}
            >
              {
                [1,2,3,4,5].map((star)=>(
                  <span
                    key={star}
                    onClick={()=>setRating(star)}
                    style={{
                      cursor:"pointer",
                      color:
                      star <= rating 
                      ? "#ffc107" 
                      : "#ccc"
                    }}
                  >
                    ★
                  </span>
                ))
              }
            </div>
            <textarea
              placeholder="Write your feedback..."
              value={review}
              onChange={(e)=>setReview(e.target.value)}
              style={{
                width:"100%",
                height:"120px",
                padding:"12px",
                borderRadius:"10px",
                border:"1px solid #ddd",
                fontSize:"16px"
              }}
            />
            <div
              style={{
                display:"flex",
                justifyContent:"flex-end",
                gap:"15px",
                marginTop:"20px"
              }}
            >
              <button
                onClick={()=>setShowReview(false)}
                style={{
                  padding:"10px 25px",
                  border:"none",
                  borderRadius:"8px",
                  background:"#ddd",
                  cursor:"pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                style={{
                  padding:"10px 25px",
                  border:"none",
                  borderRadius:"8px",
                  background:"#1976d2",
                  color:"#fff",
                  cursor:"pointer"
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
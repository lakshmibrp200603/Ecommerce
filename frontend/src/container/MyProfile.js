import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { supabase } from "../Services/supabase";

function MyProfile() {

  const [showAddressForm, setShowAddressForm] = useState(false);

  // Profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhone, setProfilePhone] = useState("");

  // Address
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [savedAddress, setSavedAddress] = useState("");



  // Load User Data
  useEffect(() => {
    fetchProfile();
  }, []);



  const fetchProfile = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){
      alert("Please login first");
      return;
    }


    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();


    if(error){
      console.log("Fetch Error:", error);
      return;
    }


    console.log("User Data:", data);


    setName(data.name || "");
    setEmail(data.email || "");
    setProfilePhone(data.phone || "");

    setSavedAddress(data.address || "");

  };





  // Save Profile
  const saveProfile = async()=>{

    const user = JSON.parse(localStorage.getItem("user"));

    const {error}= await supabase
    .from("users")
    .update({
      name:name,
      phone:profilePhone
    })
    .eq("id",user.id);


    if(error){
      console.log(error);
      alert(error.message);
    }
    else{
      alert("Profile Updated");
    }

  };







  // Save Address
  const saveAddress = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }


    const address =
    `${addressLine}, ${city}, ${state} - ${pincode}`;



    const { error } = await supabase
      .from("users")
      .update({
        address: address,
        phone: phone,
        name: fullName
      })
      .eq("id", user.id);



    if (error) {

      console.log("Supabase Error:", error);
      alert(error.message);

    } 
    else {

      alert("Address Saved Successfully");


      setSavedAddress(address);


      setFullName("");
      setPhone("");
      setAddressLine("");
      setCity("");
      setState("");
      setPincode("");

      setShowAddressForm(false);

    }

  };





return (

<div className="profile-container">


<h2>👤 My Profile</h2>


<div className="profile-card">


<label>Name</label>

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
/>



<label>Email</label>

<input
type="email"
value={email}
readOnly
/>



<label>Phone Number</label>

<input
type="text"
value={profilePhone}
onChange={(e)=>setProfilePhone(e.target.value)}
/>



<button onClick={saveProfile}>
Save Profile
</button>



<hr/>


<h3>My Addresses</h3>



{
savedAddress ?

<p>📍 {savedAddress}</p>

:

<p>No address added yet.</p>

}



<button onClick={()=>setShowAddressForm(true)}>
+ Add New Address
</button>





{
showAddressForm &&

<div className="address-form">


<h4>Add Address</h4>


<input
placeholder="Full Name"
value={fullName}
onChange={(e)=>setFullName(e.target.value)}
/>


<input
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>



<input
placeholder="Address Line"
value={addressLine}
onChange={(e)=>setAddressLine(e.target.value)}
/>



<input
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
/>



<input
placeholder="State"
value={state}
onChange={(e)=>setState(e.target.value)}
/>



<input
placeholder="Pincode"
value={pincode}
onChange={(e)=>setPincode(e.target.value)}
/>



<button onClick={saveAddress}>
Save Address
</button>



</div>

}



</div>


</div>

);

}

export default MyProfile;
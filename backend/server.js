require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// ==========================
// GET ALL PRODUCTS
// ==========================
app.get("/api/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.log("Fetch Error:", error);
    return res.status(500).json(error);
  }

  res.json(data);
});


// ==========================
// GET SINGLE PRODUCT
// ==========================
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log("Fetch Product Error:", error);
    return res.status(500).json(error);
  }

  res.json(data);
});


// ==========================
// ADD PRODUCT
// ==========================
app.post("/api/products", async (req, res) => {
  try {
    console.log("Received Product:", req.body);

    const {
      title,
      price,
      category,
      image,
      description,
      stock,
    } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          title,
          price,
          category,
          image,
          description,
          stock,
        },
      ])
      .select();

    if (error) {
      console.log("========== SUPABASE INSERT ERROR ==========");
      console.log(error);
      console.log("==========================================");

      return res.status(500).json({
        success: false,
        message: error.message,
        details: error,
      });
    }

    console.log("Product Added Successfully:", data);

    return res.status(201).json({
      success: true,
      data,
    });

  } catch (err) {
    console.log("========== SERVER ERROR ==========");
    console.log(err);
    console.log("================================");

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ==========================
// UPDATE PRODUCT
// ==========================
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const {
    title,
    price,
    category,
    image,
    description,
    stock,
  } = req.body;

  const { data, error } = await supabase
    .from("products")
    .update({
      title,
      price,
      category,
      image,
      description,
      stock,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.log("Update Error:", error);
    return res.status(500).json(error);
  }

  res.json(data);
});


// ==========================
// DELETE PRODUCT
// ==========================
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Delete Error:", error);
    return res.status(500).json(error);
  }

  res.json({
    message: "Product deleted successfully",
  });
});


// ==========================
// START SERVER
// ==========================
app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
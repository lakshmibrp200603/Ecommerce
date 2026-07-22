import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getProducts = async () => {
  try {

    const response = await axios.get(
      `${BASE_URL}/products`
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error fetching products:",
      error
    );

    throw error;
  }
};

export const getSingleProduct = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/products/${id}`
    );

    return response.data;

  } catch (error) {

    console.error(
      "Error fetching product details:",
      error
    );

    throw error;
  }
};
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "./ProductService";
import LoaderIcon from "@iconify-react/codex/loader";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // Loading Screen
  if (loading) {

    return (

      <div
        style={{textAlign: "center",marginTop: "40px"}}>

        <LoaderIcon height="6em" />

        <h2>Loading Products...</h2>

      </div>
    );
  }

  return (

    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {products.map((product) => (

        <div
          key={product.id}
          className="border rounded-xl p-3 shadow-sm"
        >

          <img
            src={product.image}
            alt={product.title}
            className="w-full h-40 object-contain rounded-lg cursor-pointer"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          />

          <h2 className="mt-2 font-semibold">
            {product.title}
          </h2>

          <p className="text-sm text-green-600">
            ${product.price}
          </p>

        </div>
      ))}
    </div>
  );
}

export default Products;
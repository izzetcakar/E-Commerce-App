import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const AllProducts = () => {
  let navigate = useNavigate();
  const { user, search } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/product");
      setProducts(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/product/${id}`);
      getAllProducts();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="ItemContainer">
      {products &&
        products
          .filter((item) => {
            if (search === "") return item;
            else if (item.name.toLowerCase().includes(search.toLowerCase()))
              return item;
          })
          .map((product) => (
            <div className="SingleItemContainer" key={product._id}>
              {user._id === product.user ? (
                <div className="EditProduct">
                  <div
                    className="EditItem"
                    style={{
                      left: 0,
                      borderTopLeftRadius: "1rem",
                      borderBottomRightRadius: "1rem",
                    }}
                    onClick={() => navigate(`/updateProduct/${product._id}`)}
                  >
                    UPDATE
                  </div>
                  <div
                    className="EditItem"
                    style={{
                      borderTopRightRadius: "1rem",
                      borderBottomLeftRadius: "1rem",
                    }}
                    onClick={() => deleteProduct(product._id)}
                  >
                    DELETE
                  </div>
                </div>
              ) : null}

              <div
                className="SingleItem"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img className="Image" alt="..." src={product.image} />
                <div className="Name">{product.name}</div>
                <div className="Price">{product.price}$</div>
                <div className="Name">In Stock:{product.countInStock}</div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default AllProducts;

import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductServices";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// icons
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";

import { saveInCartAction } from "../store/cartSlice";
import { updateFavoriteAction } from "../store/favoriteSlice";

function SingleProductPage() {
  const [singleProduct, setSingleProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [countProduct, setCountProduct] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const { allFavorite } = useSelector((state) => state.favoriteStore);

  let { id } = useParams();

  // Fetch single product
  useEffect(() => {
    ProductService.getSingleProduct(id)
      .then((res) => {
        setSingleProduct(res.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Check if product is in favorites
  useEffect(() => {
    if (allFavorite.find((item) => item.id === singleProduct.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [allFavorite, singleProduct]);

  function handleImage(index) {
    setCurrentImage(index);
  }

  function handleProductCart() {
    dispatch(saveInCartAction(singleProduct));
  }

  function handleToggleFavorite() {
    dispatch(updateFavoriteAction(singleProduct));
  }

  return (
    <div className="px-[20px]">
      {isLoading ? (
        <div className="container mx-auto flex flex-col md:flex-col lg:flex-row gap-[20px]">
          {/* Images */}
          <div className="w-[50%]">
            <img src={singleProduct.images[currentImage]} alt="" />
            <div className="flex items-center justify-between gap-[20px]">
              {singleProduct.images.map((el, index) => (
                <img
                  src={el}
                  alt=""
                  key={index}
                  className={
                    currentImage === index
                      ? "w-[140px] h-[140px] border border-main-blue p-[10px] rounded-lg cursor-pointer"
                      : "w-[140px] h-[140px] border border-border-LightGray p-[10px] rounded-lg cursor-pointer"
                  }
                  onClick={() => handleImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-[50%] flex flex-col gap-[10px]">
            <h2 className="text-main-blue text-[36px]">{singleProduct.title}</h2>
            <h5 className="font-semibold text-[20px]">${singleProduct.price}</h5>
            <Rating value={singleProduct.rating} readOnly size="large" />

            <div className="flex items-center gap-[10px]">
              <span className="text-gray-500">Availability:</span>
              {singleProduct.stock > 0 ? (
                <h3 className="flex items-center text-[#30BD57] gap-[5px] font-semibold">
                  <FaCheck size={24} /> In Stock
                </h3>
              ) : (
                <h3 className="flex items-center text-[#ff0000] gap-[5px] font-semibold">
                  <RxCross1 size={24} /> Out of Stock
                </h3>
              )}
            </div>

            <p className="text-gray-400">
              Hurry up! only{" "}
              <span className="font-extrabold text-main-blue">{singleProduct.stock}</span>{" "}
              product left in stock!
            </p>

            <div className="flex items-center gap-[20px]">
              <p className="text-gray-500">Tags:</p>
              <ul className="flex items-center gap-[10px]">
                {singleProduct.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="bg-light-Gray px-[8px] py-[4px] rounded-lg text-gray-500 cursor-pointer"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-[20px]">
              <p className="text-gray-500">Quantity:</p>
              <div className="flex items-center">
                <button className="bg-light-Gray text-gray-500 px-[10px] py-[4px] border border-gray-500">-</button>
                <span className="bg-light-Gray text-gray-500 px-[20px] py-[4px] border border-gray-500">{countProduct}</span>
                <button className="bg-light-Gray text-gray-500 px-[10px] py-[4px] border border-gray-500">+</button>
              </div>
            </div>

            <div className="flex items-center mt-[30px] gap-[20px]">
              <Link
                to={"/cart"}
                className="bg-main-Yellow text-text-White px-[26px] py-[13px] rounded-lg"
                onClick={handleProductCart}
              >
                Add To Cart
              </Link>

              <div
                className="p-[10px] rounded-full bg-[#EEEEEE] cursor-pointer"
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <IoIosHeart size={30} className="text-red-500" />
                ) : (
                  <IoIosHeartEmpty size={30} className="text-gray-500" />
                )}
              </div>
            </div>

            <hr className="my-[20px] text-gray-300" />

            <div className="flex items-center gap-[20px]">
              <FaShippingFast size={26} />
              <span className="text-gray-500">{singleProduct.shippingInformation}</span>
            </div>

            <p className="font-semibold text-gray-500">{singleProduct.returnPolicy}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default SingleProductPage;

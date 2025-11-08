import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import SingleProductPage from "../pages/SingleProductPage";

function CardComponent({product}) {
  return (
    <div className="w-[300px] border border-border-LightGray rounded-[20px] flex flex-col items-center justify-center">
      <div>
        <img src={product.thumbnail} alt="" className="w-full h-[200] object-cover" />
      </div>
      <h3>{product.title}</h3>
      <h4>${product.price}</h4>
      <Rating name="read-only" value={product.rating} readOnly />
      <Link to={`/singleProduct/${product.id}`} className="bg-main-blue text-white px-[16px] py-[8px] rounded-lg my-[15px] hover:bg-main-Yellow transition-all duration-200">View More</Link>
    </div>
  )
}

export default CardComponent

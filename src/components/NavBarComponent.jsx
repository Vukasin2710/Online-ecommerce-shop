// react-router-dom
import { Link } from "react-router-dom";
// images/logo
import logo from "../assets/logo.png";
// clerk
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

// icons
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
// react
import { useEffect, useState } from "react";
import { saveSearchProductAction } from "../store/productSlice";

function NavBarComponent() {
  const [totalProductLS, setTotalProductLS] = useState(0);
  const [searchProducts, setSearchProducts] = useState('');
  
  const dispatch = useDispatch();

  //let totalProduct = localStorage.getItem('cart_total');
   const {totalProduct} = useSelector((state) => state.cartStore);
   const {favoriteTotal} = useSelector((state) => state.favoriteStore);

   useEffect(() => {
  setTotalProductLS(totalProduct || 0);
}, [totalProduct]);

  function handleSearchProducts() {
    //console.log(searchProducts);
    dispatch(saveSearchProductAction(searchProducts))
    setSearchProducts('');
    
  }


  return (
    <div className="bg-main-blue h-full lg:h-[100px] flex items-center py-[10px]">
      <div className="container mx-auto flex justify-between items-center flex flex-col lg:flex-row gap-[10px]">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>

        <div className="bg-text-White rounded-[20px]">
          <input type="text" placeholder="Search any things" className="bg-transparent outline-none px-[20px] py-[10px] rounded-[20px] placeholder:text-gray-500 text-text-Dark cursor-pointer" value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)}/>
          <button className="bg-main-Yellow text-text-White px-[30px] py-[13px] rounded-[20px] cursor-pointer" onClick={handleSearchProducts}>Search</button>
        </div>

        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <CiUser color="white" size={25}/>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiHeart color="white" size={25}/>
            <span className="text-text-White bg-main-Yellow rounded-full px-[7px]">{favoriteTotal}</span>
            <Link to='/favorite' className="text-text-White text-[18px]">Favorite</Link>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiShoppingCart color="white" size={25} />
            <span className="text-text-White bg-main-Yellow rounded-full px-[7px]">{totalProductLS}</span>
            <Link to='/cart' className="text-text-White text-[18px]">Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarComponent;

// images/logo
import logo from "../assets/logo.png";
// clerk
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";

// icons
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

function NavBarComponent() {
  return (
    <div className="bg-main-blue h-full lg:h-[100px] flex items-center py-[10px]">
      <div className="container mx-auto flex justify-between items-center flex flex-col lg:flex-row gap-[10px]">
        <img src={logo} alt="logo" />

        <div className="bg-text-White rounded-[20px]">
          <input type="text" placeholder="Search any things" className="bg-transparent outline-none px-[20px] py-[10px] rounded-[20px] placeholder:text-gray-500 text-text-Dark cursor-pointer" />
          <button className="bg-main-Yellow text-text-White px-[30px] py-[13px] rounded-[20px] cursor-pointer">Search</button>
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
            <span className="text-text-White bg-main-Yellow rounded-full px-[7px]">0</span>
            <span className="text-text-White text-[18px]">Favorite</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <CiShoppingCart color="white" size={25} />
            <span className="text-text-White bg-main-Yellow rounded-full px-[7px]">0</span>
            <span className="text-text-White text-[18px]">Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarComponent;

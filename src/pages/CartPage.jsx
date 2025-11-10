import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {
  deleteFromCartAction,
  setPriceHandlerAction,
} from "../store/cartSlice";

function CartPage() {
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();
  const [activeCode, setActiveCode] = useState("");

  const couponRef = useRef();

  function handleRemoveProduct(productId) {
    dispatch(deleteFromCartAction(productId));
  }

  function handleIncrement(index, product) {
    if (product.count < product.stock) {
      dispatch(setPriceHandlerAction({ index, increment: 1 }));
    }
  }

  function handleDecrement(index, product) {
    if (product.count === 1) {
      handleRemoveProduct(product.id);
    } else {
      dispatch(setPriceHandlerAction({ index, increment: -1 }));
    }
  }

  function handleApplyCoupon(){
    setActiveCode(couponRef.current.value);

    couponRef.current.value = '';
  }

  return (
    <div className="mt-50px">
      <div className="container mx-auto flex flex-col lg:flex-row gap-[20px]">
        <TableContainer component={Paper} className="w-full lg:w-[70%]">
          <Table sx={{ minWidth: 250 }} aria-label="cart table">
            <TableHead className="bg-main-blue ">
              <TableRow>
                <TableCell style={{ color: "white" }}>Products</TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  Price
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  Quantity
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  Subtotal
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  Remove
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="w-[90px] h-[90px] border border-gray-300 rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell align="left">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="left">
                    <div className="flex items-center">
                      <button
                        className="px-[8px] py-[4px] bg-slate-300 text-[18px]"
                        onClick={() => handleDecrement(index, product)}
                      >
                        -
                      </button>
                      <span className="px-[8px] py-[4px] bg-slate-300 text-[18px]">
                        {product.count}
                      </span>
                      <button
                        className="px-[8px] py-[4px] bg-slate-300 text-[18px]"
                        onClick={() => handleIncrement(index, product)}
                      >
                        +
                      </button>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    ${product.cartTotal.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full lg:w-[30%]">
          <h2 className="text-text-White bg-main-blue py-[17px] text-center rounded-md">
            CART TOTAL
          </h2>
          <span className="text-center text-[20px]">
            Total Price: ${activeCode === 'alphanedim' ? totalPrice.toFixed(2) /2 : totalPrice.toFixed(2)}
          </span>

          <div className="flex flex-col">
            <input
            ref={couponRef}
              type="text"
              placeholder="Insert coupon"
              className="p-[10px] border border-gray-30 rounded-lg placeholder:text-main-blue outline-none mt-[25px]"
              // value={activeCode}
             // onChange={(e) => setActiveCode(e.target.value)}
            />
            <span className="text-[13px] text-gray-400">
              Insert coupon for 50% discount
            </span>
            <button className={activeCode === 'alphanedim' ? 'bg-gray-300 hover:bg-gray-500 text-black px-[15px] py-[7px] rounded-lg transition-all duration-200 cursor-pointer mt-[30px]' : "bg-main-blue hover:bg-main-Yellow text-white px-[15px] py-[7px] rounded-lg transition-all duration-200 cursor-pointer mt-[30px]"}
            onClick={handleApplyCoupon}
            disabled={activeCode === 'alphanedim' ? true : false}
            >
              {activeCode === 'alphanedim' ? 'Coupon applied' : 'Apply coupon'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCartAction, setPriceHandlerAction } from '../store/cartSlice';

function CartPage() {
  const { cart, totalPrice } = useSelector((state) => state.cartStore);
  const dispatch = useDispatch();

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

  return (
    <div className='mt-50px'>
      <div className='container mx-auto flex flex-col lg:flex-row gap-[20px]'>
        <TableContainer component={Paper} className='w-full lg:w-[70%]'>
          <Table sx={{ minWidth: 250 }} aria-label="cart table">
            <TableHead className='bg-main-blue '>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Products</TableCell>
                <TableCell style={{ color: 'white' }} align="left">Price</TableCell>
                <TableCell style={{ color: 'white' }} align="left">Quantity</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Subtotal</TableCell>
                <TableCell style={{ color: 'white' }} align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product, index) => (
                <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <img src={product.thumbnail} alt="" className='w-[90px] h-[90px] border border-gray-300 rounded-lg object-cover'/>
                  </TableCell>
                  <TableCell align="left">${product.price.toFixed(2)}</TableCell>
                  <TableCell align="left">
                    <div className='flex items-center'>
                      <button
                        className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
                        onClick={() => handleDecrement(index, product)}
                      >-</button>
                      <span className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>{product.count}</span>
                      <button
                        className='px-[8px] py-[4px] bg-slate-300 text-[18px]'
                        onClick={() => handleIncrement(index, product)}
                      >+</button>
                    </div>
                  </TableCell>
                  <TableCell align="right">${product.cartTotal.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <button
                      className='text-red-500 cursor-pointer'
                      onClick={() => handleRemoveProduct(product.id)}
                    >Remove</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className='w-full lg:w-[30%]'>
          <h2>CART TOTAL</h2>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default CartPage;


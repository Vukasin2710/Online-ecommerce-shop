import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function CartPage() {

  const {cart} = useSelector((state) => state.cartStore);

  return (
    <div className='mt-50px'>
      <div className='container mx-auto flex flex-col lg:flex-row gap-[20px]'>
         <TableContainer component={Paper} className='w-full lg:w-[70%]'>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead className='bg-main-blue '>
          <TableRow>
            <TableCell style={{color: 'white'}}>Products</TableCell>
            <TableCell style={{color: 'white'}} align="left">Price</TableCell>
            <TableCell style={{color: 'white'}} align="left">Quantity</TableCell>
            <TableCell style={{color: 'white'}} align="right">Subtotal</TableCell>
            <TableCell style={{color: 'white'}} align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={product.thumbnail} alt="" className='w-[90px] h-[90px] border border-gray-300 rounded-lg object-cover'/>
              </TableCell>
              <TableCell align="left">${product.price}</TableCell>
              <TableCell align="left">
                <div className='flex items-center'>
                  <button className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>-</button>
                  <span className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>{product.count}</span>
                  <button className='px-[8px] py-[4px] bg-slate-300 text-[18px]'>+</button>
                </div>
              </TableCell>
              <TableCell align="right">${product.cartTotal}</TableCell>
              <TableCell align="right">
                <button className='text-red-500'>Remove</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

          <div className='w-full lg:w-[30%]'>
            <h2>CART TOTAL</h2>
          </div>
      </div>
    </div>
  )
}

export default CartPage

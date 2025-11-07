import React from 'react'
import { useEffect,useState } from 'react';
// our services
import CategoryService from '../services/CategoryService'

function CategoryComponent() {

  const [allCategory, setAllCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    CategoryService.getAllCategory()
    .then((res) => {
      setAllCategory(res.data)
      setIsLoading(true);
    })
    .catch((err) => console.log(err))
  }, [])
  return (
    <div className=' bg-light-Gray h-[70px] flex items-center'>
      <div className='container mx-auto flex items-center gap-[20px]'>
         <button className='bg-main-blue px-[20px] py-[10px] text-text-White rounded-lg'>Show Category</button>

     {isLoading ? <div>Category</div> : <div>Loading Category...</div>}
    </div>
      </div>
     
  )
}

export default CategoryComponent

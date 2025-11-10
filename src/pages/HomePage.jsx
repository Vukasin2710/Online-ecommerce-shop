import { useEffect,useState } from "react";
import ProductService from "../services/ProductServices";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { saveAllProductsAction } from "../store/productSlice";
import CardComponent from "../components/CardComponent";

//icons 
import { IoGridOutline } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";


function HomePage() {

  const [isGrid, setIsGrid] = useState('gridView');
  const [limitProducts, setLimitProducts] = useState(10)

  const { allProducts, isLoading, selectCategory, searchProduct } = useSelector(
    (state) => state.productStore
  );
  const dispatch = useDispatch();

    useEffect(() => {
     if(searchProduct){
       ProductService.getSearchProducts(searchProduct)
      .then(res => dispatch(saveAllProductsAction(res.data.products)))
      .catch(err => console.log(err))
     }
    }, [searchProduct])

  useEffect(() => {
    if (selectCategory) {
      ProductService.getAllProductsByCategory(selectCategory)
        .then((res) => {
          dispatch(saveAllProductsAction(res.data.products));
        })
        .catch((err) => console.log(err));
    } else {
      ProductService.getAllProductsService(limitProducts)
        .then((res) => {
          dispatch(saveAllProductsAction(res.data.products));
        })
        .catch((err) => console.log(err));
    }
  }, [selectCategory, limitProducts, dispatch]); 

  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-[20px] py-[20px] justify-end">
      <CiCircleList size={28} onClick={() => setIsGrid('listView')} className={isGrid === 'listView' ? 'bg-main-Yellow p-[2px] rounded-lg' : ''}/>
      <IoGridOutline size={28} onClick={() => setIsGrid('gridView')} className={isGrid === 'gridView' ? 'bg-main-Yellow p-[2px] rounded-lg' : ''}/>
      </div>
      {isLoading ? (
        <div className={isGrid === 'gridView' ? 'flex flex-wrap items-center justify-center gap-[10px] py-[50px]': 'flex flex-col items-center justify-center gap-[10px] py-[50px]'}>
          {allProducts.map((product) => {
            return <CardComponent key={product.id} product={product} isGrid={isGrid} setIsGrid={setIsGrid}/>;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}

     {!selectCategory && !searchProduct && (
  <div className="flex items-center justify-center py-[30px]">
    <button
      className="bg-main-blue text-text-White px-[16px] py-[8px] rounded-lg hover:bg-main-Yellow transition-all duration-200 flex items-center justify-center mx-auto"
      onClick={() => setLimitProducts(limitProducts + 10)}
    >
      View More Products...
    </button>
  </div>
)}

       
    </div>
  );
}

export default HomePage;

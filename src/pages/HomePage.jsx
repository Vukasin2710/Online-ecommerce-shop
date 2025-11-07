import { useEffect } from "react"
import ProductService from "../services/ProductServices"
// Redux
import { useDispatch, useSelector } from "react-redux"
import { saveAllProductsAction } from "../store/productSlice"
function HomePage() {
  const { allProducts, isLoading } = useSelector((state) => state.productStore);
  const dispatch = useDispatch()

  useEffect(() => {
    ProductService.getAllProductsService()
    .then((res) => {
      dispatch(saveAllProductsAction(res.data.products))
    })
    .catch((err) => console.log(err))
  }, [])


  return (
    <div>HomePage</div>
  )
}

export default HomePage

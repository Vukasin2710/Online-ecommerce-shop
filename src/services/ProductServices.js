import axios from 'axios';

class ProductService {
  static getAllProductsService = () => axios.get('/products?limit=30&skip=80');
}

export default ProductService;


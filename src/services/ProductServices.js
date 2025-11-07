import axios from 'axios';

class ProductService {
  static getAllProductsService = () => axios.get('/products');
}

export default ProductService;
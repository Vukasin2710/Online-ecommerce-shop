import axios from 'axios';

class ProductService {
  static getAllProductsService = (limit) => axios.get(`/products?limit=${limit}&skip=80`);
  static getSingleProduct = (id) => axios.get(`/products/${id}`);
  static getAllProductsByCategory = (category) => axios.get(`products/category/${category}`);
  static getSearchProducts = (search) => axios.get(`/products/search?q=${search}`)
}

export default ProductService;




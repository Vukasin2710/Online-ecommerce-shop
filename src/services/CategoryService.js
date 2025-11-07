import axios from 'axios';

class CategoryService {
  static getAllCategory = () => axios.get('/products/category-list')
};

export default CategoryService;
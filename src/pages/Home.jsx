import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const categories = ['beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration', 'kitchen-accessories'];
  const brands = ['Essence', 'Glamour Beauty', 'Velvet Touch', 'Chic Cosmetics', 'Nail Couture', 'Calvin Klein', 'Chanel', 'Dior', 'Dolce & Gabbana', 'Gucci', 'Annibale Colombo', 'Furniture Co.', 'Knoll', 'Bath Trends'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get('https://product-hunt-server-sable.vercel.app/products', {
        params: {
          search,
          brand,
          category,
          priceRange,
          sort,
          page,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    };
    fetchProducts();
  }, [search, brand, category, priceRange, sort, page]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleBrandChange = (e) => setBrand(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePriceRangeChange = (e) => setPriceRange(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Discover Our Products</h1>

      <div className="filters flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered w-full border-gray-300 rounded-lg p-3 shadow-sm"
        />
        <select
          value={brand}
          onChange={handleBrandChange}
          className="select select-bordered w-full border-gray-300 rounded-lg p-3 shadow-sm"
        >
          <option value="">Brand</option>
          {brands.map((br, idx) => (
            <option key={idx} value={br}>{br}</option>
          ))}
        </select>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="select select-bordered w-full border-gray-300 rounded-lg p-3 shadow-sm"
        >
          <option value="">Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="select select-bordered w-full border-gray-300 rounded-lg p-3 shadow-sm"
        >
          <option value="">Price Range</option>
          <option value="0-10">$0 - $10</option>
          <option value="10-50">$10 - $50</option>
          <option value="50-100">$50 - $100</option>
        </select>
        <select
          value={sort}
          onChange={handleSortChange}
          className="select select-bordered w-full border-gray-300 rounded-lg p-3 shadow-sm"
        >
          <option value="">Sort</option>
          <option value="price-asc">Low to High</option>
          <option value="price-desc">High to Low</option>
          <option value="date-desc">Newest</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-secondary"></div>
        </div>
      ) : (
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <img src={product.thumbnail} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                <p className="text-sm text-gray-500">${product.price}</p>
                <div className="flex justify-center items-center text-yellow-500 mt-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={`h-5 w-5 ${index < product.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500">{product.category} - {product.brand}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description.length > 80 ? `${product.description.substring(0, 80)}...` : product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination flex justify-between items-center mt-8">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="btn btn-secondary border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-200"
        >
          Previous
        </button>
        <span className="text-lg text-gray-800">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="btn btn-secondary border-gray-300 rounded-lg p-3 text-gray-700 hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

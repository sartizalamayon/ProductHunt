import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const catagories = [
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories'
  ]

const brands=['Essence',          'Glamour Beauty',
  'Velvet Touch',     'Chic Cosmetics',
  'Nail Couture',     'Calvin Klein',
  'Chanel',           'Dior',
  'Dolce & Gabbana',  'Gucci',
  'Annibale Colombo', 'Furniture Co.',
  'Knoll',            'Bath Trends',]
  useEffect(() => {
    const fetchProducts = async () => {
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
    <div className="container">
      <h1>Product Listing</h1>
      <div className="filters">
        <input type="text" placeholder="Search by name" value={search} onChange={handleSearchChange} />
        <select value={brand} onChange={handleBrandChange}>
          <option value="">Select Brand</option>
          {brands.map((br, idx)=>{
            return <option key={idx} value={br}>{br}</option>
          })}
        </select>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {catagories.map((cat, idx)=>{
            return <option key={idx} value={cat}>{cat}</option>
          })}
        </select>
        <select value={priceRange} onChange={handlePriceRangeChange}>
          <option value="">Select Price Range</option>
          <option value="0-10">$0 - $10</option>
          <option value="10-50">$10 - $50</option>
          <option value="50-100">$50 - $100</option>
        </select>
        <select value={sort} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-desc">Newest First</option>
        </select>
      </div>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Home;

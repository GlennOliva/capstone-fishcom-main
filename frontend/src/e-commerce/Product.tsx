import React from 'react';
import '../css/styles.css';
import { Link } from 'react-router-dom';
import product_1 from '../e-commerce/images/betta-blue.png'
import product_2 from '../e-commerce/images/betta-siamese.png'

const Product = () => {
  return (
    <>
      {/* All Products */}
      <section className="section all-products" id="products">
        <div className="top container1">
          <h1>All Fish Products</h1>
          
        </div>
        <div className="product-center container1">
        <div className="product-item">
            <div className="overlay">
              <a href="productDetails.html" className="product-thumb">
                <img src={product_1} alt="Product 1" />
              </a>
            </div>
            <div className="product-info">
              <span>BETTA & ORNAMENTAL FISH</span>
              <h3>Betta splenders</h3>
              <span>Glenn's Store</span>
              <h4>₱700</h4>
            </div>
            <ul className="icons">
            <li>
    <Link to="/product_details">
      <i className="bx bx-show"></i>
    </Link>
  </li>
  <li>
    <Link to="/cart">
      <i className="bx bx-cart"></i>
    </Link>
  </li>
            </ul>
          </div>


          <div className="product-item">
            <div className="overlay">
              <a href="productDetails.html" className="product-thumb">
                <img src={product_2} alt="Product 1" />
              </a>
            </div>
            <div className="product-info">
              <span>BETTA & ORNAMENTAL FISH</span>
              <h3>Betta splenders</h3>
              <span>Glenn's Store</span>
              <h4>₱700</h4>
            </div>
            <ul className="icons">
            <li>
    <Link to="/product_details">
      <i className="bx bx-show"></i>
    </Link>
  </li>
  <li>
    <Link to="/cart">
      <i className="bx bx-cart"></i>
    </Link>
  </li>
            </ul>
          </div>

          <div className="product-item">
            <div className="overlay">
              <a href="productDetails.html" className="product-thumb">
                <img src={product_1} alt="Product 1" />
              </a>
            </div>
            <div className="product-info">
              <span>BETTA & ORNAMENTAL FISH</span>
              <h3>Betta splenders</h3>
              <span>Glenn's Store</span>
              <h4>₱700</h4>
            </div>
            <ul className="icons">
            <li>
    <Link to="/product_details">
      <i className="bx bx-show"></i>
    </Link>
  </li>
  <li>
    <Link to="/cart">
      <i className="bx bx-cart"></i>
    </Link>
  </li>
            </ul>
          </div>


          <div className="product-item">
            <div className="overlay">
              <a href="productDetails.html" className="product-thumb">
                <img src={product_2} alt="Product 1" />
              </a>
            </div>
            <div className="product-info">
              <span>BETTA & ORNAMENTAL FISH</span>
              <h3>Betta splenders</h3>
              <span>Glenn's Store</span>
              <h4>₱700</h4>
            </div>
            <ul className="icons">
            <li>
    <Link to="/product_details">
      <i className="bx bx-show"></i>
    </Link>
  </li>
  <li>
    <Link to="/cart">
      <i className="bx bx-cart"></i>
    </Link>
  </li>
            </ul>
          </div>

          {/* Repeat similar blocks for other products */}
        </div>
      </section>

      {/* Pagination Section */}
      <section className="pagination">
        <div className="container1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>
            <i className="bx bx-right-arrow-alt"></i>
          </span>
        </div>
      </section>
    </>
  );
};

export default Product;

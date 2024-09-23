import React, { useEffect } from 'react';
import '../css/styles.css'
import cat_3 from '../e-commerce/images/Fishhabitat.png';
import cat_2 from '../e-commerce/images/betta-siamese.png';
import cat_1 from '../e-commerce/images/Fishfeeds.png';
import product_1 from '../e-commerce/images/betta-blue.png'
import product_2 from '../e-commerce/images/betta-siamese.png'
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import hero_1 from '../e-commerce/images/betta-blue.png'
import hero_2 from '../e-commerce/images/betta-siamese.png'
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const initializeGlide = () => {
      const glideElement = document.querySelector('#glide_1') as HTMLElement | null;

      if (glideElement) {
        try {
          new Glide(glideElement, {
            type: 'carousel',
            startAt: 0,
            gap: 10, // Adjust gap if needed
            hoverpause: true,
            perView: 1, // Show one slide at a time
            animationDuration: 1000, // Increase duration for slower transitions
            animationTimingFunc: 'ease', // Use 'ease' for smoother transitions
            autoplay: 3000, // Adjust autoplay interval (in milliseconds) if needed
          }).mount();
          console.log('Glide initialized successfully');
        } catch (error) {
          console.error('Error initializing Glide:', error);
        }
      } else {
        console.error('Glide element not found');
      }
    };

    // Initialize Glide.js
    initializeGlide();
  }, []);

  return (
    <>
       <div className="hero">
        <div className="glide" id="glide_1">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              <li className="glide__slide">
                <div className="center">
                  <div className="left">
                    <span>New Inspiration 2024</span>
                    <h1>NEW FISH COLLECTION!</h1>
                    <p>Trending from Betta's Fish</p>
                    
                    <Link to="/product" className="hero-btn">Shop</Link>
                  </div>
                  <div className="right">
                    <img className="img1" src={hero_1} alt="Hero Image 1" />
                  </div>
                </div>
              </li>
              <li className="glide__slide">
                <div className="center">
                  <div className="left">
                    <span>New Inspiration 2024</span>
                    <h1>THE PERFECT MATCH FINDING BETTA FISH!</h1>
                    <p>Trending from FISH ENTUSIAST</p>
                    <a href="#" className="hero-btn">SHOP NOW</a>
                  </div>
                  <div className="right">
                    <img className="img2" src={hero_2} alt="Hero Image 2" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <section className="section category">
      <div className="title">
          <h1>CATEGORIES</h1>
        </div>
        <div className="cat-center">
          <div className="cat">
            <img src={cat_3} alt="Fish Habitats" />
            <div>
              <p>FISH HABITATS</p>
            </div>
          </div>
          <div className="cat">
            <img src={cat_2} alt="Betta Fish" />
            <div>
              <p>BETTA FISH</p>
            </div>
          </div>
          <div className="cat">
            <img src={cat_1} alt="Fish foodr" />
            <div>
              <p>FISH FOOD</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section new-arrival">
        <div className="title">
          <h1>SHOP</h1>
          <p>All the latest picked fish species of our store</p>
        </div>

        <div className="product-center">
          


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
          
        </div>
      </section>

      

      
    </>
  );
};

export default Home;

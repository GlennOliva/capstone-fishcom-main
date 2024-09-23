import React from 'react'
import '../css/styles.css'
import product_1 from '../e-commerce/images/betta-blue.png'
import product_2 from '../e-commerce/images/betta-siamese.png'

const ProductDetails = () => {
  return (
    <>
      {/* Product Details */}
      <section className="section product-detail">
        <div className="details container">
          <div className="left image-container">
            <div className="main">
              <img src={product_2} id="zoom" alt="Product" />
            </div>
          </div>
          <div className="right">
            <span>BETTA & ORNAMENTAL FISH</span>
            <h1>Betta Splenders</h1>
            <div className="price">₱500</div>
         
          
            <form className="form">
              <input type="text" placeholder="1" />
              <a href="/cart" className="addCart" style={{width: '25%',}}>
                Add To Cart
              </a>
            </form>
            <span>Glenn's Store</span>
            <h3>Product Details</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              minima delectus nulla voluptates nesciunt quidem laudantium,
              quisquam voluptas facilis dicta in explicabo, laboriosam ipsam
              suscipit!
            </p>
          </div>
        </div>
      </section>

 
    </>
  )
}

export default ProductDetails

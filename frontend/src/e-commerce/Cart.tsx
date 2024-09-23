import React from 'react';
import product_1 from '../e-commerce/images/betta-blue.png'
import product_2 from '../e-commerce/images/betta-siamese.png'

const Cart: React.FC = () => {
  return (
    <div className="container cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="cart-info">
                <img src={product_2} alt="Boy’s T-Shirt" />
                <div>
                <span>BETTA & ORNAMENTAL FISH</span>
              <h3>Betta splenders</h3>
              <span>Glenn's Store</span>
              <h4>₱700</h4>
                  <a href="#">remove</a>
                </div>
              </div>
            </td>
            <td><input type="number" defaultValue="1" min="1" /></td>
            <td>₱50.00</td>
          </tr>

          <tr>
            <td>
              <div className="cart-info">
                <img src={product_1} alt="Boy’s T-Shirt" />
                <div>
                <span>BETTA & ORNAMENTAL FISH</span>
              <h3>Betta splenders</h3>
              <span>Glenn's Store</span>
              <h4>₱700</h4>
                  <a href="#">remove</a>
                </div>
              </div>
            </td>
            <td><input type="number" defaultValue="1" min="1" /></td>
            <td>₱50.00</td>
          </tr>
          
        </tbody>
        <table style={{ textAlign: 'right', marginLeft: '50%' }}>
  <tbody>
    <tr>
      <td>Subtotal</td>
      <h4>₱700</h4>
    </tr>
    <tr>
      <td>Tax</td>
      <h4>₱700</h4>
    </tr>
    <tr>
      <td>Total</td>
      <h4>₱700</h4>
    </tr>
    <tr>
      <td colSpan={2} style={{ textAlign: 'right' }}>
        <a href="#" className="checkout btn">Proceed To Checkout</a>
      </td>
    </tr>
  </tbody>
</table>


        
      </table>
      
      
    </div>
  );
};

export default Cart;

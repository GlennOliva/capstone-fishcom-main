import React from 'react';
import '../css/orders.css';

const Orders = () => {
  const dummyData = [
    { id: 1, firstName: 'Glenn', lastName: 'Avilo', productName: 'Betta Fish', productPrice: 280, productQty: 2, paymentMethod: 'COD', totalPrice: 560, status: 'Delivered' },
    { id: 2, firstName: 'Glenn', lastName: 'Avilo', productName: 'Betta Fish', productPrice: 280, productQty: 2, paymentMethod: 'COD', totalPrice: 560, status: 'Cancelled' },
    { id: 3, firstName: 'Glenn', lastName: 'Avilo', productName: 'Betta Fish', productPrice: 280, productQty: 2, paymentMethod: 'COD', totalPrice: 560, status: 'Pending' },
  ];

  return (
    <div className="orders-container">
      <h1>Track Orders</h1>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Qty</th>
              <th>Payment Method</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((order) => (
              <tr key={order.id}>
                <td data-label="ID">{order.id}</td>
                <td data-label="First Name">{order.firstName}</td>
                <td data-label="Last Name">{order.lastName}</td>
                <td data-label="Product Name">{order.productName}</td>
                <td data-label="Product Price">₱{order.productPrice}</td>
                <td data-label="Product Qty">{order.productQty}</td>
                <td data-label="Payment Method">{order.paymentMethod}</td>
                <td data-label="Total Price">₱{order.totalPrice}</td>
                <td data-label="Status">
                  {order.status === 'Delivered' ? (
                    <span className="status-delivered">{order.status}</span>
                  ) : order.status === 'Cancelled' ? (
                    <span className="status-cancelled">{order.status}</span>
                  ) : (
                    <span className="status-pending">{order.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

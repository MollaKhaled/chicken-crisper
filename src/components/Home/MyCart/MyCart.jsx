// MyCart.jsx
import React, { useContext, useEffect, useState } from 'react';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseCart from '../../../hooks/UseCart';
import { AuthContext } from '../../../providers/AuthProvider';

const MyCart = () => {
  const [cart, refetch] = UseCart();
  const [updatedCart, setUpdatedCart] = useState(cart);
  const { isDrawerOpen, toggleDrawer } = useContext(AuthContext);

  useEffect(() => {
    setUpdatedCart(cart);
  }, [cart]);

  // Calculate total price
  const total = updatedCart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);

  // Handle increment and decrement for item quantity
  const handleQuantityChange = (itemId, action) => {
    const updatedItems = updatedCart.map(item => {
      if (item._id === itemId) {
        const newQuantity = action === 'increment' ? (item.quantity || 0) + 1 : (item.quantity || 0) - 1;
        return { ...item, quantity: Math.max(newQuantity, 0) }; // Ensure quantity never goes below 0
      }
      return item;
    });
    setUpdatedCart(updatedItems);
  };

  const handleDelete = item => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div>
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50">
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
            <button onClick={toggleDrawer} className="absolute top-4 right-4 text-2xl text-red-600">
              <FaTimes />
            </button>
            <h2 className="text-center text-2xl font-semibold mb-4 mt-8">My Shopping Cart:
              <button className='btn gap-2'>
                <FaShoppingCart />
                <div className='badge badge-secondary'>+{cart?.length}</div>
              </button>
            </h2>
            <h3 className="text-3xl">Total price: ${total.toFixed(2)}</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              {updatedCart.map((item) => (
                <div key={item._id} className="bg-orange-300 rounded-lg p-4 mb-4 shadow-md">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center space-x-4 mb-2">
                      <img src={item.image} alt={item.name} className="w-20" />
                      <h5 className="text-md font-semibold">{item.name}</h5>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item._id, 'decrement')}
                          className="px-2 py-1 bg-white text-sm"
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={item.quantity || 0} // Ensure it defaults to 0 if undefined
                          readOnly
                          className="text-center w-12 bg-gray-100 font-bold text-lg outline-none"
                        />
                        <button
                          onClick={() => handleQuantityChange(item._id, 'increment')}
                          className="px-2 py-1 bg-white text-sm"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <h5 className="text-lg font-semibold">$<span>{(item.price * (item.quantity || 0)).toFixed(2)}</span></h5>
                      <button onClick={() => handleDelete(item)} className="text-red-600 text-sm p-1">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;

// MenuItem.jsx
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import UseCart from '../../../../hooks/UseCart';
import { AuthContext } from '../../../../providers/AuthProvider';

const MenuItem = ({ item }) => {
  const { _id, name, recipe, image, price } = item;
  const [, refetch] = UseCart();
  const { toggleDrawer } = useContext(AuthContext);

  const handleAddToCart = () => {
    const cartItem = { menuItem: _id, name, image, price };
    fetch('http://localhost:3000/carts', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(cartItem)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          refetch();
          toggleDrawer(); // Open the drawer when an item is added
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Food Added Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl mt-40">
      <figure><img src={image} alt={name} /></figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <button onClick={handleAddToCart} className="btn btn-outline border-0 bg-slate-100 border-orange-400 border-b-4 mt-4">Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuItem;

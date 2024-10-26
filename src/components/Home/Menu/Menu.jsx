import React, { useEffect, useState } from 'react';
import MenuItem from '../Shared/MenuItem/MenuItem';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
  }, [])
  return (
    <div className='grid md:grid-cols-3 gap-10' >
      {
        menu.map(item => <MenuItem
          key={item._id}
          item={item}
        ></MenuItem>)
      }
    </div>
  );
};

export default Menu;
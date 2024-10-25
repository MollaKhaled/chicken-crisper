import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
  const menu = useLoaderData()
  return (
    <div>
      <h2>This is menu: {menu.length}</h2>
    </div>
  );
};

export default Home;
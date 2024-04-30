import React from 'react';
import Navbar from './Navbar'; 
import Banner from './Banner';
import SearchBar from './SearchBar'; 

function MainPage() {
  return (
    <div>
      <Navbar /> 
      <Banner />
      <SearchBar />
    </div>
  );
}

export default MainPage;

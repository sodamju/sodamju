// DetailPage.js
import React from 'react';
import '../App.css';
import ProductCard from '../components/ProductCard';
import InfoCard from '../components/InfoCard';
import ReviewList from '../components/ReviewList';

function DetailPage() {
    return (
        <div className="content">
            <ProductCard />
            <InfoCard />
            <ReviewList />
        </div>
    );
  }

  export default DetailPage;
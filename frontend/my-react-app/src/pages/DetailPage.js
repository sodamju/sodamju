// DetailPage.js
import React from 'react';
import '../App.css';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import InfoCard from '../components/InfoCard';
import ReviewList from '../components/ReviewList';
import Footer from '../components/Footer';

function DetailPage() {
    return (
        <div className="content">
            <Header />
            <ProductCard />
            <InfoCard />
            <ReviewList />
            <Footer />
        </div>
    );
  }

  export default DetailPage;
// HomePage.js
import React from 'react';
import '../App.css';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import ContentSection from '../components/ContentSection';
import CardSection from '../components/CardSection';
import QuoteCardSection from '../components/QuoteCardSection';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <div className="content">
            <Header />
            <ContentSection />
            <MainContent />
            <CardSection showPagination={true} />
            <QuoteCardSection />
            <Footer />
        </div>
    );
  }
  
  export default HomePage;

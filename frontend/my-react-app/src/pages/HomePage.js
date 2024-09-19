// HomePage.js
import React from 'react';
import '../App.css';
import MainContent from '../components/MainContent';
import ContentSection from '../components/ContentSection';
import CardSection from '../components/CardSection';

function HomePage() {
    return (
        <div className="content">
            <ContentSection />
            <MainContent />
            <CardSection showPagination={true} />
        </div>
    );
  }
  
export default HomePage;

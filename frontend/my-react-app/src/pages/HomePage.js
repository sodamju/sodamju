// HomePage.js
import React from 'react';
import '../App.css';
import MainContent from '../components/MainContent';
import ContentSection from '../components/ContentSection';
import RankSection from '../components/RankSection';

function HomePage() {
    return (
        <div className="content">
            <ContentSection />
            <MainContent />
            <RankSection />
        </div>
    );
  }
  
export default HomePage;

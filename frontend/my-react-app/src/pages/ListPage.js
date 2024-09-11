// ListPage.js
import React from 'react';
import '../App.css';
import Header from '../components/Header';
import CardSection from '../components/CardSection';
import Footer from '../components/Footer';

function ListPage() {
    return (
        <div className="content">
            <Header />
            <CardSection showPagination={false} />
            <Footer />
        </div>
    );
  }
  
  export default ListPage;
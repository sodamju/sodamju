// ListPage.js
import React from 'react';
import '../App.css';
import CardSection from '../components/CardSection';

function ListPage() {
    return (
        <div className="content">
            <CardSection showPagination={false} />
        </div>
    );
  }
  
  export default ListPage;
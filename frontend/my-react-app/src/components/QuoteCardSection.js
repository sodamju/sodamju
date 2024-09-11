import React from 'react';
import './QuoteCardSection.css';

function QuoteCardSection() {
  return (
    <section className="quote-card-section">
      <h3>Heading</h3>
      <h4>Subheading</h4>
      <div className="quote-card-list">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div className="quote-card" key={index}>
            <div className="quote-content">
              <p className="quote">"Quote"</p>
              <div className="quote-author">
                <img src="https://via.placeholder.com/50" alt="author" className="author-image"/>
                <div className="author-details">
                  <h5 className="author-title">Title</h5>
                  <p className="author-description">Description</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuoteCardSection;
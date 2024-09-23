import React from 'react';
import './Footer.css';
import logoImg from '../../assets/images/logo2.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="/" className="logo"><img src={logoImg} alt="Logo" /></a>
        <div className="social-icons">
          <a href="https://x.com" className="social-icon">X</a>
          <a href="https://instagram.com" className="social-icon">Instagram</a>
          <a href="https://youtube.com" className="social-icon">YouTube</a>
          <a href="https://linkedin.com" className="social-icon">LinkedIn</a>
        </div>
      </div>
      <div className="footer-middle">
        <h5>contact</h5>
        <ul>
          <li><a href="/ui-design">example@gmail.com</a></li>
        </ul>
      </div>
      <div className="footer-right">
        <h5>Resources</h5>
        <ul>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/help-center">Help Center</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

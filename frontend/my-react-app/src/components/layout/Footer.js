import React from 'react';
import './Footer.css';
import logoImg from '../../assets/images/logo2.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="/" className="logo"><img src={logoImg} alt="Logo" /></a>
      </div>
      <div className="footer-middle">
        <h5>contact</h5>
        <ul>
          <li><a href="mailto:la0503ab@gmail.com">la0503ab@gmail.com</a></li>
          <li><a href="mailto:welcomerain4@gmail.com">welcomerain4@gmail.com</a></li>
        </ul>
      </div>
      <div className="footer-right">
        <h5>Github</h5>
        <ul>
          <li><a href="https://github.com/K-sipsip/sipsip" target="_blank" rel="noopener noreferrer">https://github.com/K-sipsip/sipsip</a></li>
          <div className='github-profile'>
            <li><a href="https://github.com/HyeonJooooo" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/HyeonJooooo.png" alt="HyeonJooooo Github Profile" width="50" height="50" />
            </a></li>
            <li><a href="https://github.com/welcomerain4" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/welcomerain4.png" alt="welcomerain4 Github Profile" width="50" height="50" />
            </a></li>
          </div>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

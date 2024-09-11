import React from 'react';
import './SignupCardComponent.css'

const LoginComponent = ({ title, children }) => (
  <div className="page">
    <h1 className="logotitle">Sip Sip</h1>
    <h3>{title}</h3>
    <div className="login-container">
        {children}
    </div>    
  </div>
);

export default LoginComponent;

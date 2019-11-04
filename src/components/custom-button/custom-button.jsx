import React from 'react';
import './custom-button.style.scss';

const CustomButton = ({children, inverted, ...oprops}) => (
  <button className={`custom-button 
    ${inverted ? 'inverted' : ''}`} {...oprops}>
    {children}
  </button>
)

export default CustomButton;

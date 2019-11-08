import React from 'react';
import './custom-button.style.scss';

const CustomButton = ({children, inverted, addClass='', ...oprops}) => (
  <button className={`custom-button 
    ${inverted ? 'inverted' : ''} ${addClass}`} {...oprops}>
    {children}
  </button>
)

export default CustomButton;

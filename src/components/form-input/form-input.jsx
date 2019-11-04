import React from 'react';
import './form-input.style.scss';

const FormInput = ({handleChange, label, ...oprops}) => (
  <div className="group">
    <input className='form-input' onChange={handleChange} {...oprops} />
    {
      label 
        ? (<label className={`${oprops.value.length ?'shrink':''} form-input-label`}>{label}</label>)
        : null
    }
  </div>
)

export default FormInput;

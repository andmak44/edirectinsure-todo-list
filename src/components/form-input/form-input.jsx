import React from 'react';
import './form-input.style.scss';
import SvgIcon from '../svg-component/svg-component';

const FormInput = ({handleChange, label, ...oprops}) => (
  <div className="group">
    <input className='form-input' onChange={handleChange} {...oprops} />
    {
      label 
        ? (<label className={`${oprops.value.length ?'shrink':''} form-input-label`}>{label}</label>)
        : null
    }
    <div className='log-reg-icon'>
      <SvgIcon boxClassName={oprops.svgid} className={`${oprops.svgid}-svg`} viewBox='0 0 32 32' svgId={oprops.svgid}/>
    </div>
  </div>
)

export default FormInput;

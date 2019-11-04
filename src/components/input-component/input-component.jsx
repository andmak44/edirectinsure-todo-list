import React from 'react';
import './input-component.style.scss';
import CancelButton from '../cancel-button/cancel-button';
import EditButton from '../edit-button/edit-button';

const InputComponent = ({placeholder, handleChange, handleClick, handleChangeDesc, toggleDesc, description=false, placeholderDesc='', nameVal, descriptionVal,divId,add}) => (
  <div id={(add ? 'add' : 'edit') + `${divId}`} className={'input-box' + (add ? '' : ' none')}>
    <input 
      className={'input-cm' + (add ? '' : ' name-edit')}
      type='text'
      placeholder={placeholder}
      onChange={handleChange}
      value={nameVal}
    />
    {description ? (<input className={'input-desc' + (add ? ' none' : ' desc-edit')} type='text' placeholder={placeholderDesc} onChange={handleChangeDesc} value={descriptionVal} />) : ''}
    {add ? <span className='desc-icon' title='description' onClick={toggleDesc}>&#9830;</span> : <CancelButton />}
    {add ? <div className='input-btn' onClick={handleClick}>Add</div> : <EditButton />}
    
  </div>
);

export default InputComponent;

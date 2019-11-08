import React from 'react';
import './input-component.style.scss';
import CustomButton from '../custom-button/custom-button';
import EditButton from '../edit-button/edit-button';
import SvgIcon from '../svg-component/svg-component';

const InputComponent = ({placeholder, handleChange, handleClick, handleChangeDesc, toggleDesc, description=false, placeholderDesc='', nameVal, descriptionVal, divId, add}) => (
  <div id={(add ? 'add' : 'edit') + `${divId}`} className={'input-box' + (add ? '' : ' none')}>
    <input 
      className={'input-cm' + (add ? '' : ' name-edit')}
      type='text'
      placeholder={placeholder}
      onChange={handleChange}
      value={nameVal}
    />
    {description ? (
      <input className={'input-desc' + (add ? ' none' : ' desc-edit')} type='text' placeholder={placeholderDesc} onChange={handleChangeDesc} value={descriptionVal} />) : ''}

    <SvgIcon boxClassName='desc' className='desc-svg' viewBox='0 0 32 32' title='Description' svgId='desc' onClick={toggleDesc} />

    {add 
      ? <CustomButton type='button' onClick={handleClick}>Add</CustomButton>
      : <EditButton />}
    
  </div>
);

export default InputComponent;

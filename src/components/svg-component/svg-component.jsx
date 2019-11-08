import React from 'react';
import icons from '../../assets/icons/svg-sprite.svg';

const SvgIcon = ({boxClassName, className, viewBox, title, svgId, ...oprops}) => (
  <svg className={boxClassName} viewBox={`${viewBox}`} {...oprops}>
    <title>{title}</title>
    <use className={className} xlinkHref={`${icons}#${svgId}`} />
  </svg>
);

export default SvgIcon;

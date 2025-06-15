import React from 'react';
import './test.scss'

const Test = () => {
  const icons = [
    <img key="icon1" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f94c.svg" alt="Icon 1" />,
    <img key="icon2" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f50d.svg" alt="Icon 2" />
  ];

  return (
    <div className="test">
        <div className='test2'>
        <h1 className='tittle'>Bienvenue sur TousAuCurling</h1>
        </div>
     
    </div>
  );
}

export default Test;

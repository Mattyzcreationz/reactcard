import React, {usestate} from 'react';

import './card.css';

function card({ name, image}){
    const [{ angle, x, y}] = usestate({
        angle: Math.random() * 90 - 45,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
    });
    const transform = `translate(${x}px, ${y}, rotate(${angle}deg))`;
        
  return <img
  className="Card"
  alt={name} 
  src={image}
  style={{ transform }} />;
}

export default card;
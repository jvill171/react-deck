import React, { useState } from 'react'
import './Card.css'

const Deck = ({id, image, name}) =>{

    const [{angle, posX, posY}] = useState({
        angle: Math.floor(Math.random()*90 - 45),
        posX: Math.floor(Math.random()*30 - 15),
        posY: Math.floor(Math.random()*30 - 15)
    })

    return (
            <img
                className='Card'
                id={id}
                src={image}
                alt={name}
                style={{transform: `rotate(${angle}deg) translate(${posX}px, ${posY}px)`}}
            />
    )
}

export default Deck;
import React, { useEffect, useState } from 'react'
import Card from "./Card"
import "./Deck.css"
import axios from 'axios'

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const Deck = () =>{

    const [isShuffling, setShuffling] = useState(false)
    const [deck, setDeck] = useState(null)
    const [drawn, setDrawn] = useState([])

    // Get a new deck on load
    useEffect(function fetchDeckFromAPI(){
        async function fetchDeck(){
            try{
                const res = await axios.get(`${API_BASE_URL}/new/shuffle/`)
                setDeck(res.data)
            } catch(err){
                alert(err)
            }
        }
        fetchDeck();
    }, [])

const drawCard = (e) => {
        async function fetchCard(){
            try{
                const res = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw`)
    
                if(res.data.remaining === 0) throw new Error("no cards remaining!")
    
                const card = res.data.cards[0];
                setDrawn([...drawn, {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} OF ${card.suit}`
                }])
            } catch(err){
                alert(err)
            }
        }
        fetchCard()
    }

    const shuffleDeck = () => {
        async function fetchShuffle(){
            setShuffling(true)
            try{
                await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle`)
                setDrawn([])
            } catch(err){
                alert(err)
            } finally{
                setShuffling(false)
            }
        }
        fetchShuffle()
    }

    return (
        <div className='Deck'>
            {deck && 
                <div className='Deck-buttons'>
                    <button onClick={drawCard}      disabled={isShuffling}>Draw</button>
                    <button onClick={shuffleDeck}   disabled={isShuffling}>Shuffle</button>
                </div>
            }
            {drawn.map(card => (
                <Card
                    id={card.id}
                    key={card.id}
                    image={card.image}
                    name={card.name}
                />
            ))}
        </div>
    )
}

export default Deck;
import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

import './Deck.css';

const api = '';

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        async function loadDeckFromAPI() {
            try {
                const d = await axios.get(`${api}/new/shuffle`);
                setDeck(d.data);
            } catch (err) {
                console.error('Error loading deck:', err);
            }
        }
        loadDeckFromAPI();
    }, []);

    async function draw() {
        try {
            const draw = await axios.get(`${api}/${deck.deck_id}/draw/`);
            if (draw.data.remaining === 0) throw new Error('Deck empty!');
            const card = draw.data.cards[0];
            setDrawn(d => [
                ...d, {
                    id: card.code,
                    name: card.suit + '' + card.value,
                    image: card.image,
                },
            ]);
        } catch (err) {
            console.error('Error drawing card:', err);
            alert(err.message);
        }
    }

    async function startShuffle() {
        setIsShuffling(true);
        try {
            await axios.get(`${api}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        } catch (err) {
            console.error('Error shuffling deck:', err);
            alert(err.message);
        } finally {
            setIsShuffling(false);
        }
    }

    function renderDraw() {
        if (!deck) return null;
        return (
            <button className='draw' onClick={draw} disabled={isShuffling}>DRAW</button>
        );
    }

    function renderShuffle() {
        if (!deck) return null;
        return (
            <button className='draw' onClick={startShuffle} disabled={isShuffling}>SHUFFLE DECK</button>
        );
    }

    return (
        <main className='deck'>
            {renderDraw()}
            {renderShuffle()}
            <div className='deck card area'>
                {drawn.map(c => (
                    <Card key={c.id} name={c.name} image={c.image} />
                ))}
            </div>
        </main>
    );
}

export default Deck;

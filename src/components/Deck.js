import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from './Card';
import '../style.css';

export function Deck() {

    const cards = useSelector(state => state.cards);

    return(
        <div className="deck">
            {cards.map((el, ind) => <Card key={ind} data={el}/>)}
        </div>
    );
}

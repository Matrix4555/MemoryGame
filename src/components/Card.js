import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResult, addSecond, flipCard, pauseTimer } from '../redux/actions';
import '../style.css';

let openCard = null;
let previousTimeout = null;
let blockAll = false;

export function Card(props) {

    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards);

    function select(index) {

        const currentCard = cards[index];
        if(blockAll || currentCard.open)
            return;
        dispatch(flipCard(index));                  // open a card anyway

        if(!openCard) {                             // if there is no current open card to check
            previousTimeout = setTimeout(() => {
                dispatch(flipCard(index));          // close the card after a long period of inactivity
                openCard = null;
            }, 5000);
            openCard = currentCard;
            return;
        }

        if(currentCard.number === openCard.number) {                // if the cards are the same
            blockAll = true;                                        // block all cards when showing the second card
            setTimeout(() => {
                currentCard.open = openCard.open = 'completed';
                openCard = null;
                blockAll = false;
                setTimeout(() => {
                    if(cards.filter(el => el.open === 'completed').length === 36) {     // if all cards are open
                        dispatch(pauseTimer());
                        dispatch(addResult());
                    }
                }, 1000);       // a second ahead
            }, 300);
        }
        else {                                          // if the second up card is incorrect
            blockAll = true;                            // block all cards when showing the second card
            setTimeout(() => {
                dispatch(flipCard(index));              // then after 1 second close both of them
                dispatch(flipCard(openCard.id - 1));
                currentCard.open = false;
                openCard.open = false;
                openCard = null;
                blockAll = false;
            }, 500);
        }

        clearTimeout(previousTimeout);
        previousTimeout = null;
    }

    const passedSeconds = useSelector(state => state.passedSeconds);    // prevent the current timeout if the game was restarted
    if(!passedSeconds) {
        clearTimeout(previousTimeout);
        openCard = null;
        previousTimeout = null;
    }

    const data = props.data;
    return(
        <div className="card">
            <img
                className="card-img"
                src={ data.open ? data.open === 'completed' ?
                    './img/checkmark.png' : data.img :
                    './img/question.png' }
                onClick={data.id ? () => select(data.id - 1) : null}    // if the card has no id property, then the card is initial (at the beginning of the game)
            />
        </div>
    );
}

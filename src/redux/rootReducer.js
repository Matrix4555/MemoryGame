import { ADD_SECOND, PAUSE_TIMER, RESET_CARDS, RESET_TIMER, FLIP_CARD, ADD_RESULT } from './types';

const initialState = {
    cards: new Array(36).fill('./img/question.png'),
    passedSeconds: 0,
    timer: '00:00',
    pauseTimer: true,
    results: []
}

export const cardReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case RESET_CARDS:
            return { ...state, cards: action.payload };

        case FLIP_CARD:
            return { ...state, cards: getDeckWithFlippedCard(state.cards, action.payload) };

        case ADD_SECOND:
            return { ...state, passedSeconds: state.passedSeconds + 1, timer: getTimer(state.passedSeconds + 1) };

        case PAUSE_TIMER:
            return { ...state, pauseTimer: true };

        case RESET_TIMER:
            return { ...state, passedSeconds: 0, timer: '00:00', pauseTimer: false };

        case ADD_RESULT:
            return { ...state, results: state.results.concat(state.timer) };

        default:
            return state;
    }
}

function getDeckWithFlippedCard(originalDeck, index) {
    const deck = originalDeck.slice();
    deck[index].open = !deck[index].open;
    return deck;
}

function getTimer(seconds) {
    let minutes = 0;
    while(seconds > 59) {
        seconds -= 60;
        minutes++;
    }
    if(minutes < 10)
        minutes = '0' + minutes.toString();
    if(seconds < 10)
        seconds = '0' + seconds.toString();
    return `${minutes}:${seconds}`;
}

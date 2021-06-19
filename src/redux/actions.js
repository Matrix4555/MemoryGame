import { ADD_SECOND, PAUSE_TIMER, RESET_CARDS, RESET_TIMER, FLIP_CARD, ADD_RESULT } from "./types";

export function resetCards() {
    return dispatch => {

        let count = 0;
        const total = 36;
        const cards = [];
        const used = [];

        while(true) {
            const number = Math.floor(Math.random() * total / 2) + 1;

            if(used.filter(el => el === number).length === 2)
                continue;

            used.push(number);
            cards.push({
                id: ++count,
                number: number,
                img: `./img/${number}.png`,
                open: false
            });
            
            if(count === total)
                break;
        }

        dispatch(resetTimer());
        dispatch({
            type: RESET_CARDS,
            payload: cards
        });
    }
}

export function flipCard(index) {
    return {
        type: FLIP_CARD,
        payload: index
    };
}

export function addSecond() {
    return { type: ADD_SECOND };
}

export function pauseTimer() {
    return { type: PAUSE_TIMER };
}

export function resetTimer() {
    return { type: RESET_TIMER };
}

export function addResult() {
    return { type: ADD_RESULT };
}

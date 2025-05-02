// export enum ActionTypes {
//     VOTE = 'VOTE'
// }

// export interface VoteAction {
//     type: ActionTypes.VOTE;
//     payload: {
//         characterName: string;
//         pairId: string;
//     };
// }

// export const voteAction = (characterName: string, pairId: string): VoteAction => ({
//     type: ActionTypes.VOTE,
//     payload: { characterName, pairId }
// });

import { AppDispatcher } from './reducers';
import { Fighter } from './store';

export const CounterActionTypes = {
    INCREMENT_COUNT: 'INCREMENT_COUNT',
    DECREMENT_COUNT: 'DECREMENT_COUNT'
};

export const UserActionTypes = {
    SAVE_USER: 'SAVE_USER',
};

export const VoteActionTypes = {
    VOTE: 'VOTE',
}

export const FightActionTypes = {
    NEXT_FIGHT: 'NEXT_FIGHT',
}

export const FightActions = {
    nextFight: (fighter1: Fighter, fighter2: Fighter) => {
        AppDispatcher.dispatch({
            type: FightActionTypes.NEXT_FIGHT,
            payload: { fighter1, fighter2 },
        });
    }
}

export const VoteActions = {
    vote: (fighterId: number, fightId: number) => {
        AppDispatcher.dispatch({
            type: VoteActionTypes.VOTE,
            payload: { fighterId, fightId },
        });
    },
}

export const CounterActions = {
    increment: (value: number) => {
        AppDispatcher.dispatch({
            type: CounterActionTypes.INCREMENT_COUNT,
            payload: value,
        });
    },
    decrement: (value: number) => {
        AppDispatcher.dispatch({
            type: CounterActionTypes.DECREMENT_COUNT,
            payload: value,
        });
    },
};

export const UserActions = {
    saveUser: (user: { name: string; age: number }) => {
        AppDispatcher.dispatch({
            type: UserActionTypes.SAVE_USER,
            payload: user,
        });
    },
};
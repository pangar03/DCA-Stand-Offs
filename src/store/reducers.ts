// import { VoteAction, ActionTypes } from './actions';

// export interface VoteState {
//     [pairId: string]: string;
// }

// const initialState: VoteState = {};

// export const voteReducer = (
//     state: VoteState = initialState,
//     action: { type: string; payload?: any }
// ): VoteState => {
//     switch (action.type) {
//         case ActionTypes.VOTE:
//             const { pairId, characterName } = action.payload;
//             if (state[pairId]) return state; // ya se votó en este par
//             return {
//                 ...state,
//                 [pairId]: characterName
//             };
//         default:
//             return state;
//     }
// };

export interface Action {
    type: string;
    payload?: object | number | string;
}

export class Dispatcher {
    // Los metodos de cada store que accionan las handleActions
    private _listeners: Array<(action: Action) => void>;

    constructor() {
        this._listeners = [];
    }

    // This method is used to register a callback function that will be called
    // whenever an action is dispatched. It allows components to listen for
    // changes in the application state and update themselves accordingly.
    register(callback: (action: Action) => void): void {
        this._listeners.push(callback);
    }

    // This method is used to dispatch an action to all registered listeners.
    // It takes an action object as an argument and calls each registered
    // callback function with the action as an argument. This allows components
    // to respond to actions and update their state accordingly.
    dispatch(action: Action): void {
        for (const listener of this._listeners) {
            listener(action);
        }
    }
}

export const AppDispatcher = new Dispatcher();
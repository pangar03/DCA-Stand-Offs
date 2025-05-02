// import { voteReducer, VoteState } from './reducers';
// import { VoteAction } from './actions';

// type Listener = () => void;

// class Store {
//     private state: VoteState;
//     private listeners: Listener[];

//     constructor() {
//         const localData = localStorage.getItem('voteState');
//         this.state = localData
//             ? JSON.parse(localData)
//             : voteReducer(undefined, { type: '__INIT__' }); 
//         this.listeners = [];
//     }

//     getState() {
//         return this.state;
//     }

//     dispatch(action: VoteAction) {
//         this.state = voteReducer(this.state, action);
//         localStorage.setItem('voteState', JSON.stringify(this.state));
//         this.listeners.forEach(listener => listener());
//     }

//     subscribe(listener: Listener) {
//         this.listeners.push(listener);
//         return () => {
//             this.listeners = this.listeners.filter(o => o !== listener);
//         };
//     }
// }

// export const store = new Store();


import { AppDispatcher, Action } from './reducers';
import { CounterActionTypes, FightActionTypes, UserActionTypes, VoteActionTypes } from './actions';

export type Fighter = {
    name: string;
    house: string;
    species: string;
    image: string;
}

export type FightDetails = {
    fighter1: Fighter;
    fighter2: Fighter;
    votesFighter1: number;
    votesFighter2: number;
}

export type State = {
    count: number;
    details: FightDetails[];
};

type Listener = (state: State) => void;


class Store {
    private _myState: State = {
        count: 0,
        details: [],
    }
    // Los componentes
    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this)); // Bind the context of this method to the Store instance
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case VoteActionTypes.VOTE:
                if(typeof action.payload === 'object') {
                    const { fighterId, fightId } = action.payload as { fighterId: number; fightId: number };
                    const details = this._myState.details[fightId];
                    if (details) {
                        if (fighterId === 1) {
                            details.votesFighter1 += 1;
                        } else if (fighterId === 2) {
                            details.votesFighter2 += 1;
                        } else {
                            console.error("Invalid fighterId: ", fighterId);
                        }
                    }
                    // this._myState = {
                    //     ...this._myState,
                    //     details: [...this._myState.details],
                    // }
                    console.log("VOTED, NEW DETAILS: ", this._myState.details);
                }
                this._emitChange();
                break;
            
            case FightActionTypes.NEXT_FIGHT:
                if (typeof action.payload === 'object') {
                    const { fighter1, fighter2 } = action.payload as { fighter1: Fighter; fighter2: Fighter };
                    this._myState = {
                        count: this._myState.count + 1,
                        details: [...this._myState.details, {fighter1, fighter2, votesFighter1: 0, votesFighter2: 0} as FightDetails],
                    }
                }
                this._emitChange();
                break;

            // case CounterActionTypes.INCREMENT_COUNT:
            //     if (typeof action.payload === 'number') {
            //         this._myState = {
            //             ...this._myState,
            //             count: this._myState.count + action.payload,
            //         }
            //     }
            //     this._emitChange();
            //     break;

            // case CounterActionTypes.DECREMENT_COUNT:
            //     if (typeof action.payload === 'number') {
            //         this._myState = {
            //             ...this._myState,
            //             count: this._myState.count - action.payload,
            //         }
            //     }
            //     this._emitChange();
            //     break;

            // case UserActionTypes.SAVE_USER:
            //     if (typeof action.payload === 'object') {
            //         this._myState = {
            //             ...this._myState,
            //             details: action.payload as FightDetails[],
            //         }
            //     }
            //     this._emitChange();
            //     break;
        }
    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    // Permite a los componentes suscribirse al store
    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState()); // Emitir estado actual al suscribirse
    }

    // Permite quitar la suscripción
    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

}

export const store = new Store();
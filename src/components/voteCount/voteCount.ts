import { State, store } from "../../store/store";

class VoteCount extends HTMLElement {
    connectedCallback(){
            store.subscribe((state: State) => {this.handleChange(state)});
            this.attachShadow({ mode: 'open' });
            this.render();
        }
    
        handleChange(state: State) {
            this.render(state);
        }
    
        render(state = store.getState()){
            if(!this.shadowRoot) return;
            const votesFighter1 = state.details[state.count - 1].votesFighter1 || 0;
            const votesFighter2 = state.details[state.count - 1].votesFighter2 || 0;
            const totalVotes = votesFighter1 + votesFighter2;
            this.shadowRoot.innerHTML = `
                <style>
                    .vote-count {
                        font-size: 24px;
                        font-weight: bold;
                    }
                </style>
                <div class="vote-count">
                    <h2>Votes</h2>
                    <p>TOTAL: ${totalVotes}</p>
                    <p>${state.details[state.count -1].fighter1.name}: ${state.details[state.count - 1].votesFighter1} (${(100 / totalVotes) * votesFighter1 | 0} %)</p>
                    <p>${state.details[state.count -1].fighter2.name}: ${state.details[state.count - 1].votesFighter2} (${(100 / totalVotes) * votesFighter2 | 0} %)</p>
                </div>
            `;
        }
}

export default VoteCount;
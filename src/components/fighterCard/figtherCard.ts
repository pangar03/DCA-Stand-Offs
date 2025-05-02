import { VoteActions } from "../../store/actions";
import { State, store } from "../../store/store";

class FighterCard extends HTMLElement{
    static get observedAttributes() {
        return ['name', 'house', 'species', 'image', 'id'];
    }

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
        const fighterName = this.getAttribute('name') || 'Unknown Fighter';
        const fighterHouse = this.getAttribute('house') || 'Unknown House';
        const fighterSpecies = this.getAttribute('species') || 'Unknown Species';
        const fighterImage = this.getAttribute('image') || 'https://via.placeholder.com/150';
        const fighterId = Number(this.getAttribute('id')) || '0';

        this.shadowRoot.innerHTML = `
            <style>
                .fighter-card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    text-align: center;
                }
                .fighter-card img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            </style>
            <div class="fighter-card">
                <img src="${fighterImage}" alt="${fighterName}">
                <h2>${fighterName}</h2>
                <p>House: ${fighterHouse}</p>
                <p>Species: ${fighterSpecies}</p>
                <button id="vote-btn">Vote</button>
            </div>
        `;

        const voteBtn = this.shadowRoot.querySelector('#vote-btn');
        voteBtn?.addEventListener('click', () => {
            console.log('Vote button clicked for fighter ', fighterId);
            VoteActions.vote(Number(fighterId), state.count - 1); 
        });
    }
}

export default FighterCard;
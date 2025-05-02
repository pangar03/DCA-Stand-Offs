import { getHarryData } from "../../services/fetchHarry";
import { FightActions } from "../../store/actions";
import { Fighter, State, store } from "../../store/store";

class AppContainer extends HTMLElement {
    fighterList: Fighter[] = [];
    index: number = 0;

    async connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
        await this.prepareFighters();
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    async prepareFighters(){
        const data = await getHarryData();

        
        const fighters = data.slice(0, 16).map((character: any) => ({
            name: character.name,
            house: character.house,
            species: character.species,
            image: character.image
        }));
        this.fighterList = fighters;
    }

    render(state = store.getState()) {
        console.log("STATE: ", state);
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
            <div>
                <h1>RONDA: ${state.count}</h1>
                <div id="fighters-container"></div>
                <button id="next-fight-btn">Next Fight</button>
            </div>
        `
        const fightersContainer = this.shadowRoot.querySelector('#fighters-container');
        if(state.count > 0){
            fightersContainer!.innerHTML = `
                    <vote-count></vote-count>
                    <fighter-card name="${state.details[state.count - 1].fighter1.name}" house="${state.details[state.count - 1].fighter1.house}" species="${state.details[state.count - 1].fighter1.species}" image="${state.details[state.count - 1].fighter1.image}" id="1"></fighter-card>
                    <fighter-card name="${state.details[state.count - 1].fighter2.name}" house="${state.details[state.count - 1].fighter2.house}" species="${state.details[state.count - 1].fighter2.species}" image="${state.details[state.count - 1].fighter2.image}" id="2"></fighter-card>
            `;
        }
        const nextFightBtn = this.shadowRoot.querySelector('#next-fight-btn');
        nextFightBtn?.addEventListener('click', () => {
            console.log('Next fight button clicked');
            if(this.index <= this.fighterList.length - 2){
                FightActions.nextFight(this.fighterList[this.index], this.fighterList[this.index + 1]); 
                this.index += 2;
            } else {
                alert('No more fights available!');
            }

        });
    }
}

export default AppContainer;
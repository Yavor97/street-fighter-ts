import { IFighterInfo } from "./fighter";

export interface IHTMLExtendFormControlsCollection extends HTMLFormControlsCollection {
    name: { value: string },
    attack: { value: number },
    defense: { value: number },
    health: { value: number },
    submit: HTMLInputElement,
    cancel: HTMLInputElement

}
class ModalWindow {
    form = document.getElementById('prompt-form') as HTMLFormElement;
    container = document.getElementById('prompt-form-container') as HTMLDivElement;
    document: Document = document;

   public openWindow(fightersMap: Map<number, IFighterInfo>, id: number) {
        const fighterDetails = fightersMap.get(id);
        const { name, attack, defense, health, source } = fighterDetails;
        let form = this.form;
        let elements = form.elements as IHTMLExtendFormControlsCollection;
        elements.name.value = name;
        elements.attack.value = attack;
        elements.defense.value = defense;
        elements.health.value = health;

        this.showCover();
        this.container.style.display = 'block';
        elements.submit.onclick = () => this.saveChanges(elements, fightersMap, source, id);
        elements.cancel.onclick = () => this.complete();
    }

    private complete(): void {
        this.hideCover();
        this.container.style.display = 'none';
    }

    private saveChanges(elements: IHTMLExtendFormControlsCollection, fightersMap: Map<number, IFighterInfo>, source: string, _id: number): void {
        const name = elements.name.value;
        const attack = elements.attack.value;
        const defense = elements.defense.value;
        const health = elements.health.value;
        if (attack < 1) {
            alert("Attack must be greater than 0");
            return;
        }
        if (defense < 0) {
            alert("Defense cannot be negative");
            return;
        }
        if (health < 1) {
            alert("Health must be greater than 0");
            return;
        }
        const fightersDiv = document.getElementsByClassName('fighter');

        fightersDiv[_id - 1].lastElementChild.innerHTML = name;
        fightersMap.set(_id, {
            name,
            attack,
            defense,
            health,
            source,
            _id
        })

        this.complete();
    }

    private showCover(): void {
        let coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
        document.body.appendChild(coverDiv);
    }

    private hideCover(): void {
        let coverDiv = document.getElementById('cover-div');
        document.body.removeChild(coverDiv);
    }

}

export let modalWindow = new ModalWindow();
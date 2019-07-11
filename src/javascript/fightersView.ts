import View from './view';
import FighterView from './fighterView';
import { fighterService, IFighter } from './services/fightersService';
import { modalWindow } from './modalWindow';
import fight from './fight';
import Fighter, { IFighterInfo } from './fighter';

export default class FightersView extends View {

  handleClick: Function;
  fightersDetailsMap: Map<number, IFighterInfo> = new Map();

  constructor(fighters: IFighter[]) {
    super();
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }

  createFighters(fighters: IFighter[]) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
    const fightButton = document.getElementById('fight') as HTMLButtonElement;
    fightButton.addEventListener('click', (event: Event) => this.prepareToFight(event), false);
    fightButton.style.display = 'block';
  }

  private async prepareToFight(event: Event) {
    let checks = document.getElementsByClassName('chooseFighter');
    let fightersId: number[] = [];
    [].forEach.call(checks, (item: HTMLInputElement) => {
      if (item.checked) {
        fightersId.push(Number(item.id));
      }
    })
    if (fightersId.length != 2) {
      alert('Choose 2 fighters')
    }
    else {
      const firstId: number = fightersId[0], secondId = fightersId[1];
      if (!this.fightersDetailsMap.has(firstId)) await this.setFighterDetails(firstId);
      if (!this.fightersDetailsMap.has(secondId)) await this.setFighterDetails(secondId);
      let firstFighter = new Fighter(this.fightersDetailsMap.get(firstId));
      let secondFighter = new Fighter(this.fightersDetailsMap.get(secondId));
      fight({ firstFighter, secondFighter });
    }
  }

  protected async handleFighterClick(event: Event, fighter: IFighter) {
    let targetElement = event.target as HTMLInputElement;
    if (targetElement.tagName == 'INPUT') { return };
    let id = fighter._id;
    if (!this.fightersDetailsMap.has(id)) {
      await this.setFighterDetails(id);
    }
    await modalWindow.openWindow(this.fightersDetailsMap, id);
  }

  private async setFighterDetails(id: number) {
    const fighterDetails = await fighterService.getFighterDetails(id);
    this.fightersDetailsMap.set(id, fighterDetails);
  }
}
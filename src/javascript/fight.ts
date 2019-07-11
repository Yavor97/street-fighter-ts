import FightView from "./fightView";
import Fighter from "./fighter";

export default function fight(fighters: { firstFighter: Fighter, secondFighter: Fighter }) {
    const fightView = new FightView(fighters);
    const rootElement = document.getElementById('root') as HTMLDivElement;
    while (rootElement.firstChild) {
        rootElement.firstChild.remove();
    }
    rootElement.appendChild(fightView.element);

}
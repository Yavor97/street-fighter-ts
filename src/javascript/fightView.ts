
import View, { IElementProperties } from "./view";
import Fighter, { IFighterInfo } from "./fighter";

export default class FightView extends View {

    firstFighter: Fighter;
    secondFighter: Fighter;
    firstFighterHealthView: HTMLElement;
    secondFighterHealthView: HTMLElement;
    firstFighterImage: HTMLElement;
    secondFighterImage: HTMLElement;
    chooseFighters: HTMLElement;

    constructor(fighters: { firstFighter: Fighter, secondFighter: Fighter }) {

        super();
        this.firstFighter = fighters.firstFighter;
        this.secondFighter = fighters.secondFighter;
        this.createFight();
        this.beginFight();
    }

    private createFight() {

        this.firstFighterHealthView = this.createHealthBar(this.firstFighter.health);
        this.secondFighterHealthView = this.createHealthBar(this.secondFighter.health);

        this.firstFighterImage = this.createImage({
            src: this.firstFighter.source
        });
        this.secondFighterImage = this.createImage({
            src: this.secondFighter.source,
            style: "transform: scale(-1, 1);"
        });
        this.chooseFighters = this.createElement({
            tagName: "button",
            className: 'btn',
            attributes: {
                style: "display:none;"
            }
        })
        this.chooseFighters.innerHTML = 'Select new fighters';
        this.chooseFighters.addEventListener('click', () => location.reload())

        this.element = this.createElement({ tagName: 'div', className: 'fighters', attributes: { class: "battle fighters" } });
        this.element.append(
            this.firstFighterHealthView,
            this.secondFighterHealthView,
            this.firstFighterImage,
            this.secondFighterImage,
            this.chooseFighters);
    }

    private createHealthBar(health: number): HTMLElement {
        const attributes = { max: `${health}`, value: `${health}` };
        const healthBar: HTMLElement = this.createElement({
            tagName: 'progress',
            className: 'progress-bar',
            attributes
        })

        return healthBar;
    }

    private createImage(attributes: object): HTMLElement {
        const imgElement: HTMLElement = this.createElement(
            <IElementProperties>{
                tagName: 'img',
                className: 'fighter-image',
                attributes
            });

        return imgElement;
    }

    private beginFight() {
        const attackPeriod = 500; //ms
        let timer = setInterval(() => {
            this.firstFighter.health = this.reduceHealth(this.secondFighter, this.firstFighter);
            this.firstFighterHealthView.setAttribute('value', this.firstFighter.health.toString());
            if (this.firstFighter.health <= 0) { this.endGame(this.secondFighter.name); clearInterval(timer); }
            this.secondFighter.health = this.reduceHealth(this.firstFighter, this.secondFighter);
            this.secondFighterHealthView.setAttribute('value', this.secondFighter.health.toString())
            if (this.secondFighter.health <= 0) { this.endGame(this.firstFighter.name); clearInterval(timer); }
        }, attackPeriod)
    }

    private reduceHealth(attacker: Fighter, defender: Fighter) {
        let reduceBy = attacker.getHitPower() - defender.getBlockPower();
        if (reduceBy < 0) {
            reduceBy = 0
        };
        const health = defender.health - reduceBy;

        return health;
    }

    private endGame(winner: string) {
        alert(`${winner} won!`);
        this.chooseFighters.style.display = "inline-block";
        this.firstFighterImage.style.display = 'none';
        this.secondFighterImage.style.display = 'none';
    }

}
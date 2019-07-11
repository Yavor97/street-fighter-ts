import { IFighter } from "./services/fightersService";

export interface IFighterInfo extends IFighter {
    health: number,
    attack: number,
    defense: number
}

export default class Fighter {
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;
    _id: number;

    constructor(details: IFighterInfo) {

        this.name = details.name;
        this.health = details.health;
        this.attack = details.attack;
        this.defense = details.defense;
        this.source = details.source;
        this._id = details._id;
    }

    get criticalHitChance(): number {
        const max = 2, min = 1;

        return Math.floor((Math.random() * max) + min)
    }

    get dodgeChance(): number {
        const max = 2, min = 1;

        return Math.floor((Math.random() * max) + min)
    }

    public getHitPower(): number {
        return this.attack * this.criticalHitChance;
    }

    public getBlockPower(): number {
        return this.defense * this.dodgeChance;
    }
}

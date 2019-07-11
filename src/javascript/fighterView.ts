import View from './view';
import { IFighter } from './services/fightersService';
import {IElementProperties} from './view'
class FighterView extends View {
  constructor(fighter:IFighter, handleClick:Function) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter:IFighter, handleClick:Function) {
    const { name, source, _id } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const checkElement = this.createCheckButton(_id);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.append(checkElement, imageElement, nameElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name:string) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source:string) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }

  createCheckButton(id: number) {
    const checkElement = this.createElement(<IElementProperties>{ tagName: 'input', className: 'chooseFighter', attributes: { id, type: 'checkbox' } });
    return checkElement;
  }
}

export default FighterView;
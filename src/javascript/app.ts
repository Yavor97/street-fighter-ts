import FightersView from './fightersView';
import { fighterService, IFighter } from './services/fightersService';

export default class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root') as HTMLDivElement;
  static loadingElement = document.getElementById('loading-overlay') as HTMLDivElement;

  async startApp(): Promise<void> {
    try {
      App.loadingElement.style.visibility = 'visible';

      const fighters: IFighter[] = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
    }
    catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    }
    finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

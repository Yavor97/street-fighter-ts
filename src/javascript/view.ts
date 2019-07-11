
export interface IElementProperties { tagName: string, className: string, attributes?: any };

export default class View {
  element: HTMLElement;

  createElement({ tagName, className = '', attributes = {} }: IElementProperties) {
    const element = document.createElement(tagName) as HTMLElement;
    element.classList.add(className);
    Object.keys(attributes).forEach((key: string) => element.setAttribute(key, attributes[key]));

    return element;
  }
}


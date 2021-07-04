import template from './text-field.template'
import { AnyObject } from "../types";

export default class TextField {
  private template = template;
  data: AnyObject;
  container: HTMLElement;

  constructor(container: string, data: AnyObject = {}) {
    this.template = template
    this.data = data
    this.container = document.querySelector(container) as HTMLElement
  }

  public render() {
    const divFragment = document.createElement('div')
    divFragment.innerHTML = this.template(this.data)
    this.container.appendChild
  }
}
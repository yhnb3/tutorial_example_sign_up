import template from './text-field.template'
import { nextTick } from '../utils';
import { AnyObject } from "../types";

type Props = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  text?: string;
  require: boolean;
}

const DefaultProps : Props = {
  id: '',
  label: 'label',
  type: 'text',
  text: '',
  placeholder: '',
  require: false,
}


export default class TextField {
  private template = template;
  data: AnyObject;
  container: HTMLElement;
  updated: boolean;

  constructor(container: string, data: AnyObject = {}) {
    this.template = template
    this.data = data
    this.container = document.querySelector(container) as HTMLElement
    this.updated = false
    this.data = {...DefaultProps, ...data}

    nextTick(this.attachEventHanlder)
  }

  private attachEventHanlder() {
    this.container?.addEventListener('change', () => this.onChange)
  }

  private buildData() {
    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated
      }
    } else {
      return {
        ...this.data,
        updated: this.updated,
        valid: true
      }
    }
  }

  private onChange(e: Event) {
    const { id, value } = e.target as HTMLInputElement
    if (id === this.data.id) {
      // this.update = true
      this.data.text = value
      // this.update()
    }

  }

  public render() {
    const divFragement = document.createElement('div')
    divFragement.innerHTML = this.template(this.buildData())
    this.container.appendChild(divFragement.children[0])
  }
}
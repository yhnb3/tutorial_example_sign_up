import template from './text-field.template'
import { nextTick } from '../utils';
import { AnyObject, ValidateRule } from "../types";
import { RequireRule } from '../constants';

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
  container: string;
  updated: boolean = false;
  validateRules: ValidateRule[] = [];

  constructor(container: string, data: AnyObject = {}) {
    this.data = data
    this.container = container
    this.data = {...DefaultProps, ...data}
    
    this.addValidateRules(RequireRule)

    nextTick(this.attachEventHanlder)
  }

  private attachEventHanlder = () => {
    document.querySelector(this.container)?.addEventListener('change', this.onChange)
  }

  get getText() {
    return this.data.text
  }

  get name() {
    return this.data.id
  }

  get isValid() {
    return !this.validate()
  }

  get value() {
    return this.data.text || ''
  }

  private validate() {
    const inputValue = this.data.text ? this.data.text.trim() : ''
    const validatedRules = this.validateRules.filter((rule) => rule.rule.test(inputValue) !== rule.match)
    
    return validatedRules.length  > 0 ? validatedRules[0] : null 
  }

  private buildData() {
    const isInValid :  ValidateRule | null = this.validate()

    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated,
        valid: !isInValid,
        validateMessage: isInValid ? isInValid.message : ''
      }
    } else {
      return {
        ...this.data,
        updated: this.updated,
        valid: true
      }
    }
  }

  public addValidateRules(validateRule : ValidateRule) {
    this.validateRules.push(validateRule)
  }
  
  update() {
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement
    const divFragement = document.createElement('div')

    divFragement.innerHTML = this.template(this.buildData())
    container.innerHTML = divFragement.children[0].innerHTML
  }


  private onChange = (e: Event) => {
    const { id, value } = e.target as HTMLInputElement
    if (id === this.data.id) {
      this.updated = true
      this.data.text = value
      this.update()
    }
  }

  public render() {
    const divFragement = document.createElement('div')
    divFragement.innerHTML = this.template(this.buildData())
    document.querySelector(this.container)?.appendChild(divFragement.children[0])
  }
}
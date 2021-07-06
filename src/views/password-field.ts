import template from './password-field.template'
import { AnyObject, ValidateRule } from '../types'
import { RequireRule } from '../constants';
import { nextTick } from '../utils';

type props = {
  id: string
  valid: boolean
  require: boolean
  label: string
  text: string
  placeholder: string
}

const DefaultProps: props = {
  id: 'password',
  valid: true,
  require: false,
  label: '비밀번호',
  text: '',
  placeholder: '비밀번호를 입력하세요'
}

const StrongMessage: [string, string, string, string] = [
  '금지된 수준',
  '심각한 수준',
  '보통 수준',
  '강력한 암호',
];

export default class PasswordField {
  private template = template
  private data: AnyObject;
  private container: string;
  private updated: boolean = false;
  private validateRules: ValidateRule[] = []

  constructor(container: string) {
    this.data =  {...DefaultProps}
    this.container = container

    this.addValidateRule(RequireRule)

    nextTick(this.attatchEventHandler)
  }

  public addValidateRule(validateRule: ValidateRule) {
    this.validateRules.push(validateRule)
  }

  private attatchEventHandler = () => {
    document.querySelector(this.container)?.addEventListener('change', this.onChange)
  }

  private onChange = (e: Event) => {
    const { id, value } = e.target as HTMLInputElement

    if (id === this.data.id) {
      this.updated = true
      this.data.text = value
      this.update()
    }
  }

  private update = () => {
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement
    const docFra = document.createElement('div')
    docFra.innerHTML = this.template(this.buildData())
    container.innerHTML = docFra.children[0].innerHTML
  }

  private buildData = () => {
    let strongLevel = -1
    const isInvalid : ValidateRule | null = this.validate() 
    const target = this.data.text

    if (target.length >= 1) { strongLevel++ }
    if (target.length >= 12) { strongLevel++ }
    if (/[!@#$%&]/.test(target)){ strongLevel++ }
    if (/\d/.test(target)){ strongLevel++ }
    return {
      ...this.data,
      updated: this.updated,
      valid: this.updated ? !isInvalid : true,
      strongMessage: strongLevel < 0 ? '' : StrongMessage[strongLevel],
      strongLevel0: strongLevel >= 1,
      strongLevel1: strongLevel >= 2,
      strongLevel2: strongLevel >= 3,
      strongLevel3: strongLevel >= 4,
    }
  }

  private validate = () : ValidateRule | null  => {
    const target = this.data.text ? this.data.text.trim() : '';

    const invalidateRules = this.validateRules
      .filter(validateRule => validateRule.rule.test(target) !== validateRule.match);

    return (invalidateRules.length > 0) ? invalidateRules[0] : null;
  }

  public render() {
    const divFragment = document.createElement('div')
    divFragment.innerHTML = this.template(this.buildData())  
    document.querySelector(this.container)?.appendChild(divFragment.children[0])
  }
}

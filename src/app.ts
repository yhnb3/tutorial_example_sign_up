import template from './app.template'
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit, RequireEmailRule } from './constants';
import { AnyObject } from './types';
import { TextField, PasswordField, AddressField } from "./views";

export default class App {
  container: HTMLElement;
  fields: AnyObject[];
  template = template;

  constructor(container : string) {
    this.container = document.getElementById(container) as HTMLElement
    this.container.innerHTML = this.template({title: '내가 만드는 회원가입 길게 길게 길게 길게 길게 길게'})
    this.fields = []

    const nameField = new TextField('#required-fields', 
      {id: 'name', label: '이름',  type: 'text', placeholder: '이름을 입력하세요.', require: true}
    )
    const idField = new TextField('#required-fields', 
      {id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력하세요.', require: true}
    )
    const emailField = new TextField('#required-fields',
      {id: 'email', label: '이메일', type: 'email', placeholder: '이메일을 입력하세요.', require: true}
    )
    const pwField = new PasswordField('#required-fields')

    const addressField = new AddressField('#optional-fields')

    idField.addValidateRules(CantContainWhitespace)
    idField.addValidateRules(CantStartNumber)
    idField.addValidateRules(MinimumLengthLimit(3))

    emailField.addValidateRules(CantContainWhitespace)
    emailField.addValidateRules(RequireEmailRule)

    this.fields.push(nameField)
    this.fields.push(idField)
    this.fields.push(emailField)
    this.fields.push(pwField)
    this.fields.push(addressField)


    setInterval(this.monitoringValidation, 1000 / 30)
  }

  private monitoringValidation = () => {
    const submitBtn = document.querySelector('#btn-join') as HTMLButtonElement
    if (this.fields.filter(field => field.isValid).length === this.fields.length) {
      submitBtn.classList.remove('bg-gray-300')
      submitBtn.classList.add('bg-green-500')
    } else {
      submitBtn.classList.add('bg-gray-300')
      submitBtn.classList.remove('bg-green-500')
    }
  }

  public render() {
    this.fields.forEach((field) => {
      field.render()
    })

    document.querySelector('#btn-join')?.addEventListener('click',  (e: Event) => {
      e.preventDefault();

      const submitData = this.fields
        .map(field => ({ [field.name] : field.value }))
        .reduce((a, b) => ({...a, ...b}), {})

      console.log(submitData)
    })
  }
}
import template from './app.template'
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit, RequireEmailRule } from './constants';
import { TextField } from "./views";

export default class App {
  container: HTMLElement;
  textNodes: TextField[];
  template = template;

  constructor(container : string) {
    this.container = document.getElementById(container) as HTMLElement
    this.container.innerHTML = this.template({title: '내가 만드는 회원가입'})
    this.textNodes = []
    const nameField = new TextField('#required-fields', 
      {id: 'name', label: '이름',  type: 'text', placeholder: '이름을 입력하세요.', require: true}
    )
    const idField = new TextField('#required-fields', 
      {id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력하세요.', require: true}
    )
    const emailField = new TextField('#required-fields',
      {id: 'email', label: '이메일', type: 'email', placeholder: '이메일을 입력하세요.', require: true}
    )

    idField.addValidateRules(CantContainWhitespace)
    idField.addValidateRules(CantStartNumber)
    idField.addValidateRules(MinimumLengthLimit(3))

    emailField.addValidateRules(CantContainWhitespace)
    emailField.addValidateRules(RequireEmailRule)

    this.textNodes.push(nameField)
    this.textNodes.push(idField)
    this.textNodes.push(emailField)

  }

  public render() {
    this.textNodes.forEach((node) => {
      node.render()
    })
  }
}
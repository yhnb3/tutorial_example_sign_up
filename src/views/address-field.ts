import { AnyObject, DaumAddress } from "../types";
import template from './address-field.template'


export default class AddressField {

  template = template
  data: AnyObject = {
    id: 'address',
    label: '주소',
    displayAdress: '',
  };

  container: string; 
  
  constructor(container: string) { 
    this.container = container
  }

  update = (address: string) => {
    this.data.displayAdress = address
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement
    const docFrag = document.createElement('div')
    docFrag.innerHTML = this.template(this.data)
    container.innerHTML = docFrag.children[0].innerHTML
  }
  render = () => {
    const container = document.querySelector(this.container) as HTMLElement
    const divFrag = document.createElement('div')
    divFrag.innerHTML = this.template(this.data)
    container.appendChild(divFrag.children[0])

    container.querySelector('#search-address')?.addEventListener('click', () => {
      new window.daum.Postcode({
          oncomplete: (data: DaumAddress) => {
            (container.querySelector('#address1') as HTMLInputElement).value = data.roadAddress;
          }
      }).open()
    })
    
  }
}
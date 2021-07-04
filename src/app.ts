export default class App {
  container: HTMLElement;

  constructor(container : string) {
    this.container = document.getElementById(container) as HTMLElement
  }

  public render() {
    this.container.innerHTML = '<h1>hi</h1>'
  }
}